import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQrDto } from './dto/create-qr.dto';
import * as QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { UpdateQrDto } from './dto/update-qr.dto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class QrService {
  constructor(private readonly prisma: PrismaService) {}

  async generarQR(dto: CreateQrDto) {
    const { visitante: visitanteData, fecha_estimada_ingreso } = dto;

    // Asegurarse que el directorio tmp existe
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)){
        fs.mkdirSync(tmpDir, { recursive: true });
    }

    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Crear o encontrar visitante
      let visitante = await tx.visitante.findUnique({
        where: { ci: visitanteData.ci },
      });

      if (!visitante) {
        visitante = await tx.visitante.create({
          data: visitanteData,
        });
      }

      // 2️⃣ Crear visita
      const visita = await tx.visita.create({
        data: {
          fecha_estimada_ingreso: new Date(fecha_estimada_ingreso),
          visitanteId: visitante.id,
          residenteId: 1, //por prueba
          estadoVisitaId: 1, // 'Programado' por defecto
          modalidadId: 1, // Asignar modalidad por defecto para visitas con QR
        },
      });

      // 3️⃣ Generar QR único y URL
      const codigo = `QR-${Date.now()}-${visita.id}`;
      const link = `https://sistema-condominio.com/validar-qr/${codigo}`; // URL de ejemplo

      const filePath = `${tmpDir}/${Date.now()}.png`;
      await QRCode.toFile(filePath, link);

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'qr_codes',
      });

      fs.unlinkSync(filePath); // Limpiar archivo temporal

      if (!uploadResult || !uploadResult.secure_url) {
        throw new Error('Error al subir la imagen del QR a Cloudinary.');
      }

      const qr = await tx.qR.create({
        data: {
          codigo,
          url_image: uploadResult.secure_url,
          fecha_generacion: new Date(),
          fecha_expiracion: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h de validez
          visitaId: visita.id,
          estadoQRId: 1, // 'Generado' o 'Programado'
        },
      });

      // 4️⃣ Respuesta final
      return {
        qrId: qr.id,
        codigo: qr.codigo,
        url_image: qr.url_image,
        visitante: {
          id: visitante.id,
          nombre_completo: `${visitante.nombre} ${visitante.apellido_paterno}`,
        },
        visitaId: visita.id,
      };
    });
  }

  // --- Manteniendo otros métodos por si son necesarios en otras partes ---
  async findAll() {
    return this.prisma.qR.findMany();
  }

  async findOne(id: number) {
    const qr = await this.prisma.qR.findUnique({ where: { id } });
    if (!qr) throw new NotFoundException(`QR con id ${id} no encontrado.`);
    return qr;
  }

  /* // Se comenta temporalmente para evitar error de linter no relacionado
  async update(id: number, updateQrDto: UpdateQrDto) {
    return this.prisma.qR.update({
      where: { id },
      data: updateQrDto,
    });
  }
  */

  async remove(id: number) {
    return this.prisma.qR.delete({ where: { id } });
  }
}
