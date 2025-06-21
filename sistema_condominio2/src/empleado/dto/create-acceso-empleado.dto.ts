import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum TipoAcceso {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA'
}

export class CreateAccesoEmpleadoDto {
  @IsNumber()
  @IsNotEmpty()
  empleadoId: number;

  @IsEnum(TipoAcceso)
  @IsNotEmpty()
  tipo_acceso: TipoAcceso;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsString()
  @IsOptional()
  metodo_acceso?: string;
} 