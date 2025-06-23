import { IsString, IsNotEmpty } from 'class-validator';

export class CreateViviendaDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  bloque: string;

  @IsString()
  @IsNotEmpty()
  zona: string;
} 