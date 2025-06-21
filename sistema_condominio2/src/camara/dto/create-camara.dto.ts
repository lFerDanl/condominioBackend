import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsNumber, 
  IsEnum,
  IsUrl,
  Min,
  Max
} from 'class-validator';
import { TipoCamara, EstadoCamara } from '@prisma/client';

export class CreateCamaraDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsEnum(TipoCamara)
  tipo: TipoCamara;

  @IsEnum(EstadoCamara)
  @IsOptional()
  estado?: EstadoCamara;

  // Configuración de conexión
  @IsString()
  @IsOptional()
  ip_address?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(65535)
  puerto?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsUrl()
  @IsOptional()
  url_stream?: string;

  // Configuración de grabación
  @IsBoolean()
  @IsOptional()
  grabacion_activa?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(365)
  retencion_dias?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
} 