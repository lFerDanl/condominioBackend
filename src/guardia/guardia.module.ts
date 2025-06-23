import { Module } from '@nestjs/common';
import { GuardiaService } from './guardia.service';
import { GuardiaController } from './guardia.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GuardiaController],
  providers: [GuardiaService],
  exports: [GuardiaService],
})
export class GuardiaModule {}
