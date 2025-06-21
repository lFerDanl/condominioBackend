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
import { CamaraService } from './camara.service';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';
import { CreateModeloIADto } from './dto/create-modelo-ia.dto';
import { UpdateModeloIADto } from './dto/update-modelo-ia.dto';
import { AsignarModeloIADto } from './dto/asignar-modelo-ia.dto';

@Controller('camara')
export class CamaraController {
  constructor(private readonly camaraService: CamaraService) {}

  // ===== ENDPOINTS PARA CÁMARAS =====
  @Post()
  create(@Body() createCamaraDto: CreateCamaraDto) {
    return this.camaraService.create(createCamaraDto);
  }

  @Get()
  findAll() {
    return this.camaraService.findAll();
  }

  @Get('estadisticas')
  obtenerEstadisticas() {
    return this.camaraService.obtenerEstadisticasCamaras();
  }

  @Get('estado/:estado')
  obtenerPorEstado(@Param('estado') estado: string) {
    return this.camaraService.obtenerCamarasPorEstado(estado);
  }

  @Get('con-modelo-ia/:tipo')
  obtenerConModeloIA(@Param('tipo') tipo: string) {
    return this.camaraService.obtenerCamarasConModeloIA(tipo);
  }

  @Get('test')
  test() {
    console.log('🧪 Endpoint de prueba llamado');
    return { message: 'Test endpoint working', timestamp: new Date().toISOString() };
  }

  // ===== ENDPOINTS PARA MODELOS DE IA =====
  @Post('modelo-ia')
  createModeloIA(@Body() createModeloIADto: CreateModeloIADto) {
    return this.camaraService.createModeloIA(createModeloIADto);
  }

  @Get('modelo-ia')
  findAllModelosIA() {
    console.log('🔍 Endpoint /camara/modelo-ia llamado');
    console.log('📅 Timestamp:', new Date().toISOString());
    try {
      const result = this.camaraService.findAllModelosIA();
      console.log('✅ Resultado obtenido correctamente');
      return result;
    } catch (error) {
      console.error('❌ Error en findAllModelosIA:', error);
      throw error;
    }
  }

  @Get('modelo-ia/:id')
  findOneModeloIA(@Param('id', ParseIntPipe) id: number) {
    return this.camaraService.findOneModeloIA(id);
  }

  @Patch('modelo-ia/:id')
  updateModeloIA(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModeloIADto: UpdateModeloIADto,
  ) {
    return this.camaraService.updateModeloIA(id, updateModeloIADto);
  }

  @Delete('modelo-ia/:id')
  removeModeloIA(@Param('id', ParseIntPipe) id: number) {
    return this.camaraService.removeModeloIA(id);
  }

  // ===== ENDPOINTS PARA GESTIÓN DE MODELOS DE IA EN CÁMARAS =====
  @Post('asignar-modelo-ia')
  asignarModeloIA(@Body() asignarModeloIADto: AsignarModeloIADto) {
    return this.camaraService.asignarModeloIA(asignarModeloIADto);
  }

  @Get('eventos')
  obtenerEventosDeteccion(
    @Query('camaraId') camaraId?: string,
    @Query('modeloIAId') modeloIAId?: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const params = {
      camaraId: camaraId ? parseInt(camaraId) : undefined,
      modeloIAId: modeloIAId ? parseInt(modeloIAId) : undefined,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
      fechaFin: fechaFin ? new Date(fechaFin) : undefined,
    };

    return this.camaraService.obtenerEventosDeteccion(
      params.camaraId,
      params.modeloIAId,
      params.fechaInicio,
      params.fechaFin,
    );
  }

  @Get('modelo-ia/:modeloIAId/eventos')
  obtenerEventosPorModeloIA(@Param('modeloIAId', ParseIntPipe) modeloIAId: number) {
    return this.camaraService.obtenerEventosDeteccion(undefined, modeloIAId);
  }

  // ===== RUTA GENÉRICA PARA CÁMARAS (DEBE IR AL FINAL) =====
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.camaraService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCamaraDto: UpdateCamaraDto,
  ) {
    return this.camaraService.update(id, updateCamaraDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.camaraService.remove(id);
  }

  @Patch(':camaraId/modelo-ia/:modeloIAId/configuracion')
  actualizarConfiguracionModeloIA(
    @Param('camaraId', ParseIntPipe) camaraId: number,
    @Param('modeloIAId', ParseIntPipe) modeloIAId: number,
    @Body() configuracion: any,
  ) {
    return this.camaraService.actualizarConfiguracionModeloIA(
      camaraId,
      modeloIAId,
      configuracion,
    );
  }

  @Delete(':camaraId/modelo-ia/:modeloIAId')
  desasignarModeloIA(
    @Param('camaraId', ParseIntPipe) camaraId: number,
    @Param('modeloIAId', ParseIntPipe) modeloIAId: number,
  ) {
    return this.camaraService.desasignarModeloIA(camaraId, modeloIAId);
  }

  @Post(':camaraId/modelo-ia/:modeloIAId/evento')
  registrarEventoDeteccion(
    @Param('camaraId', ParseIntPipe) camaraId: number,
    @Param('modeloIAId', ParseIntPipe) modeloIAId: number,
    @Body() evento: {
      tipo_evento: string;
      confianza: number;
      descripcion?: string;
      datos_deteccion?: any;
      imagen_captura?: string;
    },
  ) {
    return this.camaraService.registrarEventoDeteccion(
      camaraId,
      modeloIAId,
      evento,
    );
  }

  @Get(':camaraId/eventos')
  obtenerEventosPorCamara(@Param('camaraId', ParseIntPipe) camaraId: number) {
    return this.camaraService.obtenerEventosDeteccion(camaraId);
  }
} 