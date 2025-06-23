import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateVisitaDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_estimada_ingreso: string;

  @IsDateString()
  @IsOptional()
  fecha_real_ingreso?: string;

  @IsDateString()
  @IsOptional()
  fecha_salida?: string;

  @IsString()
  @IsOptional()
  motivo_visita?: string;

  @IsNumber()
  @IsNotEmpty()
  visitanteId: number;

  @IsNumber()
  @IsNotEmpty()
  residenteId: number;

  @IsNumber()
  @IsOptional()
  guardiaId?: number;

  @IsNumber()
  @IsNotEmpty()
  estadoVisitaId: number;
} 