import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateVisitanteDto } from './dto/create-visitante.dto';
  import { UpdateVisitanteDto } from './dto/update-visitante.dto';
  
  @Injectable()
  export class VisitanteService {
    private readonly logger = new Logger(VisitanteService.name);
  
    constructor(private prisma: PrismaService) {}
  
    async create(data: CreateVisitanteDto) {
      if (!data) {
        throw new BadRequestException('Los datos del visitante son requeridos');
      }
      
      this.logger.log(`Creando visitante con CI: ${data.ci}`);
  /*
      const exists = await this.prisma.visitante.findUnique({
            where: { ci: data.ci },
      });
  */

          // ... en visitante.service.ts
    const exists = await this.prisma.visitante.findFirst({ // <-- Cambia findUnique por findFirst
        where: { ci: data.ci },
    });
    
      if (exists) {
        throw new BadRequestException(
          `Ya existe un visitante con CI: ${data.ci}`,
        );
      }
  
      return this.prisma.visitante.create({ data });
    }
  
    async findAll() {
      this.logger.log(`Listando todos los visitantes`);
      return this.prisma.visitante.findMany();
    }
  
    async findOne(id: number) {
      const visitante = await this.prisma.visitante.findUnique({
        where: { id },
      });
  
      if (!visitante) {
        throw new NotFoundException(`Visitante con ID ${id} no encontrado`);
      }
  
      return visitante;
    }
  
    async update(id: number, data: UpdateVisitanteDto) {
      this.logger.log(`Actualizando visitante ID: ${id}`);
  
      await this.findOne(id); // Validar existencia
  
      if (data.ci) {
        // Validar que el nuevo CI no exista en otro visitante
        const existeCI = await this.prisma.visitante.findFirst({
          where: {
            ci: data.ci,
            NOT: { id },
          },
        });
  
        if (existeCI) {
          throw new BadRequestException(
            `El CI ${data.ci} ya está registrado en otro visitante`,
          );
        }
      }
  
      return this.prisma.visitante.update({
        where: { id },
        data,
      });
    }
  
    async remove(id: number) {
      this.logger.log(`Eliminando visitante ID: ${id}`);
      await this.findOne(id); // Validar existencia
  
      return this.prisma.visitante.delete({ where: { id } });
    }

    async findByCi(ci: string) {
      this.logger.log(`Buscando visitante con CI: ${ci}`);
      
      const visitante = await this.prisma.visitante.findUnique({
        where: { ci },
      });

      if (!visitante) {
        throw new NotFoundException(`Visitante con CI ${ci} no encontrado`);
      }

      return visitante;
    }
  }
  