import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum TipoAccesoResidente {
  INGRESO = 'INGRESO'
}

export class CreateAccesoResidenteDto {
  @IsNumber()
  @IsNotEmpty()
  residenteId: number;

  @IsEnum(TipoAccesoResidente)
  @IsNotEmpty()
  tipo_acceso: TipoAccesoResidente;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsString()
  @IsOptional()
  metodo_acceso?: string;
} 