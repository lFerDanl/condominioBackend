import { Module } from '@nestjs/common';
import { EstadoVisitaService } from './estado-visita.service';
import { EstadoVisitaController } from './estado-visita.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstadoVisitaController],
  providers: [EstadoVisitaService],
  exports: [EstadoVisitaService],
})
export class EstadoVisitaModule {} 