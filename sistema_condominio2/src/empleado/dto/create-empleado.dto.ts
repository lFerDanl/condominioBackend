import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean, IsDateString, IsNumber, IsEnum, IsDecimal } from 'class-validator';

export enum EstadoEmpleado {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  SUSPENDIDO = 'SUSPENDIDO',
  DESPEDIDO = 'DESPEDIDO',
  VACACIONES = 'VACACIONES'
}

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  apellido_materno: string;

  @IsString()
  @IsNotEmpty()
  ci: string;

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
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

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