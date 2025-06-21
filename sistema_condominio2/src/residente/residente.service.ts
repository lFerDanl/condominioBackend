import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidenteDto } from './dto/create-residente.dto';
import { UpdateResidenteDto } from './dto/update-residente.dto';
import { CreateAccesoResidenteDto } from './dto/create-acceso-residente.dto';

@Injectable()
export class ResidenteService {
  constructor(private prisma: PrismaService) {}

  async create(createResidenteDto: CreateResidenteDto) {
    const data = {
      ...createResidenteDto,
      fecha_registro: new Date(),
      fecha_nacimiento: createResidenteDto.fecha_nacimiento 
        ? new Date(createResidenteDto.fecha_nacimiento) 
        : undefined,
    };

    return this.prisma.residente.create({
      data,
      include: {
        vivienda: true,
        accesos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.residente.findMany({
      include: {
        vivienda: true,
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 10, // Últimos 10 accesos
        },
        visitas: {
          include: {
            visitante: true,
            estadoVisita: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const residente = await this.prisma.residente.findUnique({
      where: { id },
      include: {
        vivienda: true,
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
        },
        visitas: {
          include: {
            visitante: true,
            estadoVisita: true,
            guardia: true,
          },
        },
      },
    });

    if (!residente) {
      throw new NotFoundException(`Residente con ID ${id} no encontrado`);
    }

    return residente;
  }

  async update(id: number, updateResidenteDto: UpdateResidenteDto) {
    // Verificar que el residente existe
    await this.findOne(id);

    const data = {
      ...updateResidenteDto,
      fecha_nacimiento: updateResidenteDto.fecha_nacimiento 
        ? new Date(updateResidenteDto.fecha_nacimiento) 
        : undefined,
    };

    return this.prisma.residente.update({
      where: { id },
      data,
      include: {
        vivienda: true,
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  async remove(id: number) {
    // Verificar que el residente existe
    await this.findOne(id);

    return this.prisma.residente.delete({
      where: { id },
      include: {
        vivienda: true,
      },
    });
  }

  // Métodos para gestión de accesos
  async registrarAcceso(createAccesoDto: CreateAccesoResidenteDto) {
    // Verificar que el residente existe
    await this.findOne(createAccesoDto.residenteId);

    return this.prisma.accesoResidente.create({
      data: {
        residenteId: createAccesoDto.residenteId,
        tipo_acceso: createAccesoDto.tipo_acceso,
        ubicacion: createAccesoDto.ubicacion,
        metodo_acceso: createAccesoDto.metodo_acceso,
        fecha_hora: new Date(),
      },
      include: {
        residente: {
          include: {
            vivienda: true,
          },
        },
      },
    });
  }

  async obtenerAccesosResidente(residenteId: number) {
    // Verificar que el residente existe
    await this.findOne(residenteId);

    return this.prisma.accesoResidente.findMany({
      where: { residenteId },
      orderBy: {
        fecha_hora: 'desc',
      },
      include: {
        residente: {
          include: {
            vivienda: true,
          },
        },
      },
    });
  }

  async obtenerAccesosPorFecha(fechaInicio: Date, fechaFin: Date) {
    return this.prisma.accesoResidente.findMany({
      where: {
        fecha_hora: {
          gte: fechaInicio,
          lte: fechaFin,
        },
      },
      orderBy: {
        fecha_hora: 'desc',
      },
      include: {
        residente: {
          include: {
            vivienda: true,
          },
        },
      },
    });
  }

  async obtenerEstadisticasAccesos() {
    const totalAccesos = await this.prisma.accesoResidente.count();
    const accesosHoy = await this.prisma.accesoResidente.count({
      where: {
        fecha_hora: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    const accesosPorMetodo = await this.prisma.accesoResidente.groupBy({
      by: ['metodo_acceso'],
      _count: {
        metodo_acceso: true,
      },
    });

    return {
      totalAccesos,
      accesosHoy,
      accesosPorMetodo,
    };
  }
}
