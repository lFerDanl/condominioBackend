import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

// Datos del visitante para actualización
export class UpdateVisitanteDataDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido_paterno?: string;

  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @IsString()
  @IsOptional()
  ci?: string;
}

// DTO principal para actualizar visita directa
export class UpdateVisitaDirectaDto {
  // Datos del visitante (opcionales para actualización)
  @IsOptional()
  visitante?: UpdateVisitanteDataDto;

  // Datos de la visita
  @IsDateString()
  @IsOptional()
  fecha_estimada_ingreso?: string;

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
  @IsOptional()
  residenteId?: number;

  @IsNumber()
  @IsOptional()
  guardiaId?: number;

  @IsNumber()
  @IsOptional()
  estadoVisitaId?: number;
} 