import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsEnum,
  IsObject
} from 'class-validator';
import { TipoModeloIA } from '@prisma/client';

export class CreateModeloIADto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsEnum(TipoModeloIA)
  tipo: TipoModeloIA;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsOptional()
  proveedor?: string;

  @IsObject()
  @IsOptional()
  configuracion?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
} 