import { IsString, IsOptional, IsEmail, IsBoolean, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { EstadoEmpleado } from './create-empleado.dto';

export class UpdateEmpleadoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido_paterno?: string;

  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @IsString()
  @IsOptional()
  ci?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  fecha_nacimiento?: string;

  @IsString()
  @IsOptional()
  cargo?: string;

  @IsString()
  @IsOptional()
  departamento?: string;

  @IsNumber()
  @IsOptional()
  salario?: number;

  @IsString()
  @IsOptional()
  horario_entrada?: string;

  @IsString()
  @IsOptional()
  horario_salida?: string;

  @IsString()
  @IsOptional()
  dias_trabajo?: string;

  @IsEnum(EstadoEmpleado)
  @IsOptional()
  estado?: EstadoEmpleado;

  @IsBoolean()
  @IsOptional()
  foto_registrada?: boolean;

  @IsString()
  @IsOptional()
  observaciones?: string;
} 