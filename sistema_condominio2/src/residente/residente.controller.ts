import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe,
  Query,
  ParseDatePipe
} from '@nestjs/common';
import { ResidenteService } from './residente.service';
import { CreateResidenteDto } from './dto/create-residente.dto';
import { UpdateResidenteDto } from './dto/update-residente.dto';
import { CreateAccesoResidenteDto } from './dto/create-acceso-residente.dto';

@Controller('residente')
export class ResidenteController {
  constructor(private readonly residenteService: ResidenteService) {}

  @Post()
  create(@Body() createResidenteDto: CreateResidenteDto) {
    return this.residenteService.create(createResidenteDto);
  }

  @Get()
  findAll() {
    return this.residenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.residenteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResidenteDto: UpdateResidenteDto,
  ) {
    return this.residenteService.update(id, updateResidenteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.residenteService.remove(id);
  }

  // Endpoints para gestión de accesos
  @Post('acceso')
  registrarAcceso(@Body() createAccesoDto: CreateAccesoResidenteDto) {
    return this.residenteService.registrarAcceso(createAccesoDto);
  }

  @Get(':id/accesos')
  obtenerAccesosResidente(@Param('id', ParseIntPipe) id: number) {
    return this.residenteService.obtenerAccesosResidente(id);
  }

  @Get('accesos/por-fecha')
  obtenerAccesosPorFecha(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    return this.residenteService.obtenerAccesosPorFecha(fechaInicioDate, fechaFinDate);
  }

  @Get('accesos/estadisticas')
  obtenerEstadisticasAccesos() {
    return this.residenteService.obtenerEstadisticasAccesos();
  }
}
