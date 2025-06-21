import { Module } from '@nestjs/common';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule {} 