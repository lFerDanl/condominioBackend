import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGuardiaDto } from './dto/create-guardia.dto';
import { UpdateGuardiaDto } from './dto/update-guardia.dto';

@Injectable()
export class GuardiaService {
  private readonly logger = new Logger(GuardiaService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateGuardiaDto) {
    if (!data) {
      throw new BadRequestException('Los datos del guardia son requeridos');
    }

    this.logger.log(`Creando guardia: ${data.nombre}`);

    return this.prisma.guardia.create({ data });
  }

  async findAll() {
    this.logger.log('Listando todos los guardias');
    return this.prisma.guardia.findMany();
  }

  async findOne(id: number) {
    const guardia = await this.prisma.guardia.findUnique({ where: { id } });
    if (!guardia) {
      throw new NotFoundException(`Guardia con ID ${id} no encontrado`);
    }
    return guardia;
  }

  async update(id: number, data: UpdateGuardiaDto) {
    this.logger.log(`Actualizando guardia ID: ${id}`);
    await this.findOne(id);

    return this.prisma.guardia.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    this.logger.log(`Eliminando guardia ID: ${id}`);
    await this.findOne(id);
    return this.prisma.guardia.delete({ where: { id } });
  }
}
