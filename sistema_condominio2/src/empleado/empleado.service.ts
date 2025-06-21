import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateAccesoEmpleadoDto } from './dto/create-acceso-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const data = {
      ...createEmpleadoDto,
      fecha_nacimiento: createEmpleadoDto.fecha_nacimiento 
        ? new Date(createEmpleadoDto.fecha_nacimiento) 
        : undefined,
    };

    return this.prisma.empleado.create({
      data,
      include: {
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 10, // Últimos 10 accesos
        },
      },
    });
  }

  async findAll() {
    return this.prisma.empleado.findMany({
      include: {
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  async findOne(id: number) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
      include: {
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
        },
      },
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    // Verificar que el empleado existe
    await this.findOne(id);

    const data = {
      ...updateEmpleadoDto,
      fecha_nacimiento: (updateEmpleadoDto as any).fecha_nacimiento 
        ? new Date((updateEmpleadoDto as any).fecha_nacimiento) 
        : undefined,
    };

    return this.prisma.empleado.update({
      where: { id },
      data,
      include: {
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
    // Verificar que el empleado existe
    await this.findOne(id);

    return this.prisma.empleado.delete({
      where: { id },
    });
  }

  // Métodos para gestión de accesos
  async registrarAcceso(createAccesoDto: CreateAccesoEmpleadoDto) {
    // Verificar que el empleado existe
    await this.findOne(createAccesoDto.empleadoId);

    return this.prisma.accesoEmpleado.create({
      data: {
        empleadoId: createAccesoDto.empleadoId,
        tipo_acceso: createAccesoDto.tipo_acceso,
        ubicacion: createAccesoDto.ubicacion,
        metodo_acceso: createAccesoDto.metodo_acceso,
        fecha_hora: new Date(),
      },
      include: {
        empleado: true,
      },
    });
  }

  async obtenerAccesosEmpleado(empleadoId: number) {
    // Verificar que el empleado existe
    await this.findOne(empleadoId);

    return this.prisma.accesoEmpleado.findMany({
      where: { empleadoId },
      orderBy: {
        fecha_hora: 'desc',
      },
      include: {
        empleado: true,
      },
    });
  }

  async obtenerAccesosPorFecha(fechaInicio: Date, fechaFin: Date) {
    return this.prisma.accesoEmpleado.findMany({
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
        empleado: true,
      },
    });
  }

  async obtenerEstadisticasAccesos() {
    const totalAccesos = await this.prisma.accesoEmpleado.count();
    const accesosHoy = await this.prisma.accesoEmpleado.count({
      where: {
        fecha_hora: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    const accesosPorTipo = await this.prisma.accesoEmpleado.groupBy({
      by: ['tipo_acceso'],
      _count: {
        tipo_acceso: true,
      },
    });

    const accesosPorMetodo = await this.prisma.accesoEmpleado.groupBy({
      by: ['metodo_acceso'],
      _count: {
        metodo_acceso: true,
      },
    });

    return {
      totalAccesos,
      accesosHoy,
      accesosPorTipo,
      accesosPorMetodo,
    };
  }

  async obtenerEmpleadosPorDepartamento(departamento: string) {
    return this.prisma.empleado.findMany({
      where: {
        departamento: {
          equals: departamento,
          mode: 'insensitive',
        },
      },
      include: {
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 5,
        },
      },
    });
  }

  async obtenerEmpleadosActivos() {
    return this.prisma.empleado.findMany({
      where: {
        estado: 'ACTIVO',
      },
      include: {
        accesos: {
          orderBy: {
            fecha_hora: 'desc',
          },
          take: 5,
        },
      },
    });
  }
} 