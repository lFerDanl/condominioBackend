import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';
import { CreateModeloIADto } from './dto/create-modelo-ia.dto';
import { UpdateModeloIADto } from './dto/update-modelo-ia.dto';
import { AsignarModeloIADto } from './dto/asignar-modelo-ia.dto';

@Injectable()
export class CamaraService {
  constructor(private prisma: PrismaService) {}

  // ===== CRUD CÁMARAS =====
  async create(createCamaraDto: CreateCamaraDto) {
    return this.prisma.camara.create({
      data: createCamaraDto,
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.camara.findMany({
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const camara = await this.prisma.camara.findUnique({
      where: { id },
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
            eventos: {
              orderBy: {
                fecha_deteccion: 'desc',
              },
              take: 10,
            },
          },
        },
      },
    });

    if (!camara) {
      throw new NotFoundException(`Cámara con ID ${id} no encontrada`);
    }

    return camara;
  }

  async update(id: number, updateCamaraDto: UpdateCamaraDto) {
    await this.findOne(id);

    return this.prisma.camara.update({
      where: { id },
      data: updateCamaraDto,
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.camara.delete({
      where: { id },
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  // ===== CRUD MODELOS DE IA =====
  async createModeloIA(createModeloIADto: CreateModeloIADto) {
    return this.prisma.modeloIA.create({
      data: createModeloIADto,
      include: {
        camaras: {
          include: {
            camara: true,
          },
        },
      },
    });
  }

  async findAllModelosIA() {
    return this.prisma.modeloIA.findMany({
      include: {
        camaras: {
          include: {
            camara: true,
          },
        },
      },
    });
  }

  async findOneModeloIA(id: number) {
    const modeloIA = await this.prisma.modeloIA.findUnique({
      where: { id },
      include: {
        camaras: {
          include: {
            camara: true,
          },
        },
      },
    });

    if (!modeloIA) {
      throw new NotFoundException(`Modelo de IA con ID ${id} no encontrado`);
    }

    return modeloIA;
  }

  async updateModeloIA(id: number, updateModeloIADto: UpdateModeloIADto) {
    await this.findOneModeloIA(id);

    return this.prisma.modeloIA.update({
      where: { id },
      data: updateModeloIADto,
      include: {
        camaras: {
          include: {
            camara: true,
          },
        },
      },
    });
  }

  async removeModeloIA(id: number) {
    await this.findOneModeloIA(id);

    return this.prisma.modeloIA.delete({
      where: { id },
      include: {
        camaras: {
          include: {
            camara: true,
          },
        },
      },
    });
  }

  // ===== GESTIÓN DE MODELOS DE IA EN CÁMARAS =====
  async asignarModeloIA(asignarModeloIADto: AsignarModeloIADto) {
    // Verificar que la cámara y el modelo existen
    await this.findOne(asignarModeloIADto.camaraId);
    await this.findOneModeloIA(asignarModeloIADto.modeloIAId);

    // Verificar que no esté ya asignado
    const asignacionExistente = await this.prisma.camaraModeloIA.findUnique({
      where: {
        camaraId_modeloIAId: {
          camaraId: asignarModeloIADto.camaraId,
          modeloIAId: asignarModeloIADto.modeloIAId,
        },
      },
    });

    if (asignacionExistente) {
      throw new BadRequestException('Este modelo ya está asignado a esta cámara');
    }

    return this.prisma.camaraModeloIA.create({
      data: {
        camaraId: asignarModeloIADto.camaraId,
        modeloIAId: asignarModeloIADto.modeloIAId,
        activo: asignarModeloIADto.activo ?? true,
        configuracion: asignarModeloIADto.configuracion,
        sensibilidad: asignarModeloIADto.sensibilidad,
        intervalo_analisis: asignarModeloIADto.intervalo_analisis,
        alertas_activas: asignarModeloIADto.alertas_activas ?? true,
        notificar_guardia: asignarModeloIADto.notificar_guardia ?? true,
        notificar_admin: asignarModeloIADto.notificar_admin ?? false,
      },
      include: {
        camara: true,
        modeloIA: true,
      },
    });
  }

  async actualizarConfiguracionModeloIA(
    camaraId: number,
    modeloIAId: number,
    configuracion: any,
  ) {
    const asignacion = await this.prisma.camaraModeloIA.findUnique({
      where: {
        camaraId_modeloIAId: {
          camaraId,
          modeloIAId,
        },
      },
    });

    if (!asignacion) {
      throw new NotFoundException('Modelo no asignado a esta cámara');
    }

    return this.prisma.camaraModeloIA.update({
      where: {
        camaraId_modeloIAId: {
          camaraId,
          modeloIAId,
        },
      },
      data: configuracion,
      include: {
        camara: true,
        modeloIA: true,
      },
    });
  }

  async desasignarModeloIA(camaraId: number, modeloIAId: number) {
    const asignacion = await this.prisma.camaraModeloIA.findUnique({
      where: {
        camaraId_modeloIAId: {
          camaraId,
          modeloIAId,
        },
      },
    });

    if (!asignacion) {
      throw new NotFoundException('Modelo no asignado a esta cámara');
    }

    return this.prisma.camaraModeloIA.delete({
      where: {
        camaraId_modeloIAId: {
          camaraId,
          modeloIAId,
        },
      },
    });
  }

  // ===== CONSULTAS ESPECÍFICAS =====
  async obtenerCamarasPorEstado(estado: string) {
    return this.prisma.camara.findMany({
      where: { estado: estado as any },
      include: {
        modelos_ia: {
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  async obtenerCamarasConModeloIA(tipoModeloIA: string) {
    return this.prisma.camara.findMany({
      where: {
        modelos_ia: {
          some: {
            modeloIA: {
              tipo: tipoModeloIA as any,
            },
            activo: true,
          },
        },
      },
      include: {
        modelos_ia: {
          where: {
            modeloIA: {
              tipo: tipoModeloIA as any,
            },
          },
          include: {
            modeloIA: true,
          },
        },
      },
    });
  }

  async obtenerEstadisticasCamaras() {
    const totalCamaras = await this.prisma.camara.count();
    const camarasActivas = await this.prisma.camara.count({
      where: { estado: 'ACTIVA' },
    });
    const camarasConIA = await this.prisma.camara.count({
      where: {
        modelos_ia: {
          some: {
            activo: true,
          },
        },
      },
    });

    const modelosPorTipo = await this.prisma.modeloIA.groupBy({
      by: ['tipo'],
      _count: {
        tipo: true,
      },
    });

    return {
      totalCamaras,
      camarasActivas,
      camarasConIA,
      modelosPorTipo,
    };
  }

  // ===== GESTIÓN DE EVENTOS DE DETECCIÓN =====
  async registrarEventoDeteccion(
    camaraId: number,
    modeloIAId: number,
    evento: {
      tipo_evento: string;
      confianza: number;
      descripcion?: string;
      datos_deteccion?: any;
      imagen_captura?: string;
    },
  ) {
    // Verificar que el modelo está asignado a la cámara
    const asignacion = await this.prisma.camaraModeloIA.findUnique({
      where: {
        camaraId_modeloIAId: {
          camaraId,
          modeloIAId,
        },
      },
    });

    if (!asignacion) {
      throw new NotFoundException('Modelo no asignado a esta cámara');
    }

    return this.prisma.eventoDeteccion.create({
      data: {
        camaraModeloIAId: asignacion.id,
        tipo_evento: evento.tipo_evento,
        confianza: evento.confianza,
        descripcion: evento.descripcion,
        datos_deteccion: evento.datos_deteccion,
        imagen_captura: evento.imagen_captura,
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });
  }

  async obtenerEventosDeteccion(
    camaraId?: number,
    modeloIAId?: number,
    fechaInicio?: Date,
    fechaFin?: Date,
  ) {
    const where: any = {};

    if (camaraId) {
      where.camaraModeloIA = {
        camaraId,
      };
    }

    if (modeloIAId) {
      where.camaraModeloIA = {
        ...where.camaraModeloIA,
        modeloIAId,
      };
    }

    if (fechaInicio || fechaFin) {
      where.fecha_deteccion = {};
      if (fechaInicio) where.fecha_deteccion.gte = fechaInicio;
      if (fechaFin) where.fecha_deteccion.lte = fechaFin;
    }

    return this.prisma.eventoDeteccion.findMany({
      where,
      orderBy: {
        fecha_deteccion: 'desc',
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });
  }
} 