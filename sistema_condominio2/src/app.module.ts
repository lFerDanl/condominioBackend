import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViviendaModule } from './vivienda/vivienda.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ViviendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
