import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { VisitaService } from './visita.service';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { CreateVisitaDirectaDto } from './dto/create-visita-directa.dto';
import { UpdateVisitaDirectaDto } from './dto/update-visita-directa.dto';

@Controller('visita')
export class VisitaController {
  constructor(private readonly visitaService: VisitaService) {}

  /**
   * Crea una nueva visita (requiere visitante existente)
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(new ValidationPipe()) dto: CreateVisitaDto) {
    return this.visitaService.create(dto);
  }

  /**
   * Crea una visita directa con visitante (crea visitante si no existe)
   * 
   * Este endpoint permite registrar una visita creando automáticamente
   * el visitante si no existe, o reutilizando uno existente si ya
   * está registrado con esa CI.
   * 
   * @param dto - Datos del visitante y la visita
   * @returns Visita creada con información completa
   */
  @Post('directa')
  @HttpCode(HttpStatus.CREATED)
  createDirecta(@Body(new ValidationPipe()) dto: CreateVisitaDirectaDto) {
    return this.visitaService.createDirecta(dto);
  }

  /**
   * Actualiza una visita directa (incluye datos del visitante)
   * 
   * Este endpoint permite actualizar tanto los datos de la visita
   * como los datos del visitante asociado en una sola operación.
   * 
   * @param id - ID de la visita a actualizar
   * @param dto - Datos de actualización del visitante y la visita
   * @returns Visita actualizada con información completa
   */
  @Patch('directa/:id')
  @HttpCode(HttpStatus.OK)
  updateDirecta(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateVisitaDirectaDto
  ) {
    return this.visitaService.updateDirecta(id, dto);
  }

  /**
   * Obtiene todas las visitas
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.visitaService.findAll();
  }

  /**
   * Obtiene una visita por ID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitaService.findOne(id);
  }

  /**
   * Actualiza una visita existente
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateVisitaDto,
  ) {
    return this.visitaService.update(id, dto);
  }

  /**
   * Elimina una visita
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitaService.remove(id);
  }

  // Endpoints adicionales para búsquedas específicas
  
  /**
   * Busca visitas por visitante
   */
  @Get('visitante/:visitanteId')
  @HttpCode(HttpStatus.OK)
  findByVisitante(@Param('visitanteId', ParseIntPipe) visitanteId: number) {
    return this.visitaService.findByVisitante(visitanteId);
  }

  /**
   * Busca visitas por residente
   */
  @Get('residente/:residenteId')
  @HttpCode(HttpStatus.OK)
  findByResidente(@Param('residenteId', ParseIntPipe) residenteId: number) {
    return this.visitaService.findByResidente(residenteId);
  }

  /**
   * Busca visitas por estado
   */
  @Get('estado/:estadoVisitaId')
  @HttpCode(HttpStatus.OK)
  findByEstado(@Param('estadoVisitaId', ParseIntPipe) estadoVisitaId: number) {
    return this.visitaService.findByEstado(estadoVisitaId);
  }

  /**
   * Obtiene la vista formateada de una única visita por su ID.
   * @param id - El ID de la visita a consultar.
   * @returns Un objeto con la información de la visita formateada.
   */
  @Get('vista/:id')
  @HttpCode(HttpStatus.OK)
  vistaVisita(@Param('id', ParseIntPipe) id: number) {
    return this.visitaService.vistaVisita(id);
  }
} 