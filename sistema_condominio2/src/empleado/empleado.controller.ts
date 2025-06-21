import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateAccesoEmpleadoDto } from './dto/create-acceso-empleado.dto';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get('activos')
  obtenerEmpleadosActivos() {
    return this.empleadoService.obtenerEmpleadosActivos();
  }

  @Get('departamento/:departamento')
  obtenerEmpleadosPorDepartamento(@Param('departamento') departamento: string) {
    return this.empleadoService.obtenerEmpleadosPorDepartamento(departamento);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.remove(id);
  }

  // Endpoints para gestión de accesos
  @Post('acceso')
  registrarAcceso(@Body() createAccesoDto: CreateAccesoEmpleadoDto) {
    return this.empleadoService.registrarAcceso(createAccesoDto);
  }

  @Get(':id/accesos')
  obtenerAccesosEmpleado(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.obtenerAccesosEmpleado(id);
  }

  @Get('accesos/por-fecha')
  obtenerAccesosPorFecha(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    return this.empleadoService.obtenerAccesosPorFecha(fechaInicioDate, fechaFinDate);
  }

  @Get('accesos/estadisticas')
  obtenerEstadisticasAccesos() {
    return this.empleadoService.obtenerEstadisticasAccesos();
  }
} 