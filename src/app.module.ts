import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViviendaModule } from './vivienda/vivienda.module';
import { PrismaModule } from './prisma/prisma.module';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { VisitanteModule } from './visitante/visitante.module';
import { ResidenteModule } from './residente/residente.module';
import { VisitaModule } from './visita/visita.module';
import { GuardiaModule } from './guardia/guardia.module';
import { EstadoVisitaModule } from './estado-visita/estado-visita.module';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    PrismaModule, 
    ViviendaModule, 
    VisitanteModule, 
    ResidenteModule, 
    VisitaModule, 
    GuardiaModule, 
    EstadoVisitaModule, 
    QrModule,
    HttpModule
  ],
  controllers: [AppController, WhatsappController],
  providers: [AppService, WhatsappService],
})
export class AppModule {}


// src/app.module.ts

