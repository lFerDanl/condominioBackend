import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoVisitaDto } from './create-estado-visita.dto';

export class UpdateEstadoVisitaDto extends PartialType(CreateEstadoVisitaDto) {} 