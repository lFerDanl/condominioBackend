import { PartialType } from '@nestjs/mapped-types';
import { CreateGuardiaDto } from './create-guardia.dto';

export class UpdateGuardiaDto extends PartialType(CreateGuardiaDto) {} 