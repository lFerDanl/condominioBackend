import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResidenteDto {
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

  @IsNumber()
  @IsNotEmpty()
  viviendaId: number;
} 