import { PartialType } from '@nestjs/mapped-types';
import { CreateCamaraDto } from './create-camara.dto';

export class UpdateCamaraDto extends PartialType(CreateCamaraDto) {} 