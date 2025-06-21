import { PartialType } from '@nestjs/mapped-types';
import { CreateModeloIADto } from './create-modelo-ia.dto';

export class UpdateModeloIADto extends PartialType(CreateModeloIADto) {} 