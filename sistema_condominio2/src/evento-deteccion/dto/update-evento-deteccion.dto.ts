import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDeteccionDto } from './create-evento-deteccion.dto';

export class UpdateEventoDeteccionDto extends PartialType(CreateEventoDeteccionDto) {}
