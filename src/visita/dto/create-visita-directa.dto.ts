import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

// Datos del visitante
export class VisitanteDataDto {
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

// DTO principal para crear visita directa
export class CreateVisitaDirectaDto {
  // Datos del visitante
  @IsNotEmpty()
  visitante: VisitanteDataDto;

  // Datos de la visita
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
  residenteId: number;

  @IsNumber()
  @IsOptional()
  guardiaId?: number;

  /**
   * ID del estado de la visita.
   * Si no se proporciona, se asignará por defecto el estado 1 (Pendiente).
   */
  @IsNumber()
  @IsOptional()
  estadoVisitaId?: number;
} 