import { PartialType } from '@nestjs/mapped-types';
import { CreateResidenteDto } from './create-residente.dto';

export class UpdateResidenteDto extends PartialType(CreateResidenteDto) {} 