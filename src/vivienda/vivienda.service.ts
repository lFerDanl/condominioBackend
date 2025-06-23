import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateViviendaDto } from './dto/create-vivienda.dto';
import { UpdateViviendaDto } from './dto/update-vivienda.dto';

@Injectable()
export class ViviendaService {
  constructor(private prisma: PrismaService) {}

  async create(createViviendaDto: CreateViviendaDto) {
    return await this.prisma.vivienda.create({
      data: createViviendaDto,
    });
  }

  async findAll() {
    return this.prisma.vivienda.findMany({
      include: {
        residentes: true,
      },
    });
  }

  async findOne(id: number) {
    const vivienda = await this.prisma.vivienda.findUnique({
      where: { id },
      include: {
        residentes: true,
      },
    });

    if (!vivienda) {
      throw new NotFoundException(`Vivienda con ID ${id} no encontrada`);
    }

    return vivienda;
  }

  async update(id: number, updateViviendaDto: UpdateViviendaDto) {
    try {
      return await this.prisma.vivienda.update({
        where: { id },
        data: updateViviendaDto,
        include: {
          residentes: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Vivienda con ID ${id} no encontrada`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.vivienda.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Vivienda con ID ${id} no encontrada`);
    }
  }
}
