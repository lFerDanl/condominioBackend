import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEmail, IsBoolean, IsDateString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  fecha_nacimiento?: string;

  @IsBoolean()
  @IsOptional()
  foto_registrada?: boolean;
} 