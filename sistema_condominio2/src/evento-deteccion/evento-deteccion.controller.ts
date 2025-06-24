import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoDeteccionService } from './evento-deteccion.service';
import { CreateEventoDeteccionDto } from './dto/create-evento-deteccion.dto';
import { UpdateEventoDeteccionDto } from './dto/update-evento-deteccion.dto';

/**
 * Controlador para gestionar eventos de detección del sistema de seguridad
 * Maneja las operaciones CRUD para eventos detectados por las cámaras con IA
 */
@Controller('evento-deteccion')
export class EventoDeteccionController {
  constructor(private readonly eventoDeteccionService: EventoDeteccionService) {}

  /**
   * Crea un nuevo evento de detección
   * @param createEventoDeteccionDto - Datos del evento a crear
   * @returns El evento creado con información de la cámara y modelo de IA
   */
  @Post()
  create(@Body() createEventoDeteccionDto: CreateEventoDeteccionDto) {
    return this.eventoDeteccionService.create(createEventoDeteccionDto);
  }

  /**
   * Obtiene todos los eventos de detección
   * @returns Lista de todos los eventos ordenados por fecha de detección (más recientes primero)
   */
  @Get()
  findAll() {
    return this.eventoDeteccionService.findAll();
  }

  /**
   * Obtiene un evento de detección específico por su ID
   * @param id - ID del evento a buscar
   * @returns El evento encontrado o lanza NotFoundException si no existe
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoDeteccionService.findOne(+id);
  }

  /**
   * Actualiza un evento de detección existente
   * @param id - ID del evento a actualizar
   * @param updateEventoDeteccionDto - Datos actualizados del evento
   * @returns El evento actualizado
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoDeteccionDto: UpdateEventoDeteccionDto) {
    return this.eventoDeteccionService.update(+id, updateEventoDeteccionDto);
  }

  /**
   * Elimina un evento de detección
   * @param id - ID del evento a eliminar
   * @returns El evento eliminado
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoDeteccionService.remove(+id);
  }
}
