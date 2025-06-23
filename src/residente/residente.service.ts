import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidenteDto } from './dto/create-residente.dto';
import { UpdateResidenteDto } from './dto/update-residente.dto';

@Injectable()
export class ResidenteService {
  private readonly logger = new Logger(ResidenteService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateResidenteDto) {
    if (!data) {
      throw new BadRequestException('Los datos del residente son requeridos');
    }
    
    this.logger.log(`Creando residente con CI: ${data.ci}`);
    
    const exists = await this.prisma.residente.findFirst({
      where: { ci: data.ci },
    });

    if (exists) {
      throw new BadRequestException(`Ya existe un residente con CI: ${data.ci}`);
    }

    return this.prisma.residente.create({ data });
  }

  async findAll() {
    this.logger.log(`Listando todos los residentes`);
    return this.prisma.residente.findMany();
  }

  async findOne(id: number) {
    const residente = await this.prisma.residente.findUnique({ where: { id } });
    if (!residente) {
      throw new NotFoundException(`Residente con ID ${id} no encontrado`);
    }
    return residente;
  }

  async update(id: number, data: UpdateResidenteDto) {
    this.logger.log(`Actualizando residente ID: ${id}`);
    await this.findOne(id);

    if (data.ci) {
      const exists = await this.prisma.residente.findFirst({
        where: { ci: data.ci, NOT: { id } },
      });
      if (exists) {
        throw new BadRequestException(
          `El CI ${data.ci} ya está registrado en otro residente`,
        );
      }
    }

    return this.prisma.residente.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    this.logger.log(`Eliminando residente ID: ${id}`);
    await this.findOne(id);
    return this.prisma.residente.delete({ where: { id } });
  }
} 