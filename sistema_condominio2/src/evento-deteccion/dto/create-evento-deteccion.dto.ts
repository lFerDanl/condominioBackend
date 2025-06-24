import { IsInt, IsString, IsNumber, IsOptional, IsBoolean, IsDateString, Min, Max, IsEnum } from 'class-validator';

export class CreateEventoDeteccionDto {
  @IsInt()
  camaraModeloIAId: number;

  @IsString()
  tipo_evento: string;

  @IsNumber()
  @Min(0.0)
  @Max(1.0)
  confianza: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  datos_deteccion?: any; // JSON data

  @IsOptional()
  @IsString()
  imagen_captura?: string;

  @IsOptional()
  @IsEnum(['NUEVO', 'PROCESANDO', 'PROCESADO', 'FALSO_POSITIVO', 'ERROR'])
  estado?: string;

  @IsOptional()
  @IsBoolean()
  procesado?: boolean;

  @IsOptional()
  @IsDateString()
  fecha_procesamiento?: string;
}
