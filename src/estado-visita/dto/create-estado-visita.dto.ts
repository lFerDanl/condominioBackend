import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEstadoVisitaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
} 