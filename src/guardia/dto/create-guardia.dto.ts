import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGuardiaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  turno: string;
} 