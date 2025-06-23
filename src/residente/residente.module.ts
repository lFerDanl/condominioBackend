// src/residente/residente.module.ts

import { Module } from '@nestjs/common';
import { ResidenteService } from './residente.service';
import { ResidenteController } from './residente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResidenteController],
  providers: [ResidenteService],
 exports: [ResidenteService],
})
export class ResidenteModule {}

