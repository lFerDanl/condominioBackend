import { Module } from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import { VisitanteController } from './visitante.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VisitanteController],
  providers: [VisitanteService],
  exports: [VisitanteService],
 
})
export class VisitanteModule {}