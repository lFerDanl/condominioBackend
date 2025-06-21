import { 
  IsNumber, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsObject,
  Min,
  Max
} from 'class-validator';

export class AsignarModeloIADto {
  @IsNumber()
  @IsNotEmpty()
  camaraId: number;

  @IsNumber()
  @IsNotEmpty()
  modeloIAId: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsObject()
  @IsOptional()
  configuracion?: Record<string, any>;

  @IsNumber()
  @IsOptional()
  @Min(0.0)
  @Max(1.0)
  sensibilidad?: number;

  @IsNumber()
  @IsOptional()
  @Min(100)
  @Max(60000)
  intervalo_analisis?: number;

  @IsBoolean()
  @IsOptional()
  alertas_activas?: boolean;

  @IsBoolean()
  @IsOptional()
  notificar_guardia?: boolean;

  @IsBoolean()
  @IsOptional()
  notificar_admin?: boolean;
} 