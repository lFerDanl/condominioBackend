import { IsNotEmpty, IsString, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VisitanteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  apellido_materno: string;

  @IsString()
  @IsNotEmpty()
  ci: string;
}

export class CreateQrDto {
  @ValidateNested()
  @Type(() => VisitanteDto)
  visitante: VisitanteDto;

  @IsDateString()
  fecha_estimada_ingreso: string;
} 