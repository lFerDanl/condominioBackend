import { Module } from '@nestjs/common';
import { EventoDeteccionService } from './evento-deteccion.service';
import { EventoDeteccionController } from './evento-deteccion.controller';

@Module({
  controllers: [EventoDeteccionController],
  providers: [EventoDeteccionService],
})
export class EventoDeteccionModule {}
