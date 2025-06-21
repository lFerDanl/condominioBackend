import { Module } from '@nestjs/common';
import { CamaraController } from './camara.controller';
import { CamaraService } from './camara.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CamaraController],
  providers: [CamaraService],
  exports: [CamaraService],
})
export class CamaraModule {} 