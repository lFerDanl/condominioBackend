import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstadoVisitaDto } from './dto/create-estado-visita.dto';
import { UpdateEstadoVisitaDto } from './dto/update-estado-visita.dto';

@Injectable()
export class EstadoVisitaService {
  private readonly logger = new Logger(EstadoVisitaService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstadoVisitaDto) {
    if (!data) {
      throw new BadRequestException('Los datos del estado de visita son requeridos');
    }

    this.logger.log(`Creando estado de visita: ${data.nombre}`);

    // Verificar que no existe un estado con el mismo nombre
    const exists = await this.prisma.estadoVisita.findFirst({
      where: { nombre: data.nombre },
    });

    if (exists) {
      throw new BadRequestException(`Ya existe un estado de visita con el nombre: ${data.nombre}`);
    }

    return this.prisma.estadoVisita.create({ data });
  }

  async findAll() {
    this.logger.log('Listando todos los estados de visita');
    return this.prisma.estadoVisita.findMany();
  }

  async findOne(id: number) {
    const estadoVisita = await this.prisma.estadoVisita.findUnique({ where: { id } });
    if (!estadoVisita) {
      throw new NotFoundException(`Estado de visita con ID ${id} no encontrado`);
    }
    return estadoVisita;
  }

  async update(id: number, data: UpdateEstadoVisitaDto) {
    this.logger.log(`Actualizando estado de visita ID: ${id}`);
    await this.findOne(id);

    if (data.nombre) {
      const exists = await this.prisma.estadoVisita.findFirst({
        where: { nombre: data.nombre, NOT: { id } },
      });
      if (exists) {
        throw new BadRequestException(
          `Ya existe un estado de visita con el nombre: ${data.nombre}`,
        );
      }
    }

    return this.prisma.estadoVisita.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    this.logger.log(`Eliminando estado de visita ID: ${id}`);
    await this.findOne(id);
    return this.prisma.estadoVisita.delete({ where: { id } });
  }
} 