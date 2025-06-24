import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDeteccionDto } from './dto/create-evento-deteccion.dto';
import { UpdateEventoDeteccionDto } from './dto/update-evento-deteccion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Servicio para gestionar eventos de detección del sistema de seguridad
 * Maneja todas las operaciones relacionadas con eventos detectados por cámaras con IA
 */
@Injectable()
export class EventoDeteccionService {
  constructor(private prisma: PrismaService) {}
  
  /**
   * Crea un nuevo evento de detección
   * @param createEventoDeteccionDto - Datos del evento a crear
   * @returns El evento creado con información de la cámara y modelo de IA
   */
  async create(createEventoDeteccionDto: CreateEventoDeteccionDto) {
    return this.prisma.eventoDeteccion.create({
      data: {
        camaraModeloIAId: createEventoDeteccionDto.camaraModeloIAId,
        tipo_evento: createEventoDeteccionDto.tipo_evento,
        confianza: createEventoDeteccionDto.confianza,
        descripcion: createEventoDeteccionDto.descripcion,
        datos_deteccion: createEventoDeteccionDto.datos_deteccion,
        imagen_captura: createEventoDeteccionDto.imagen_captura,
        procesado: createEventoDeteccionDto.procesado || false,
        fecha_procesamiento: createEventoDeteccionDto.fecha_procesamiento 
          ? new Date(createEventoDeteccionDto.fecha_procesamiento) 
          : null,
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });
  }

  /**
   * Obtiene todos los eventos de detección
   * @returns Lista de todos los eventos ordenados por fecha de detección (más recientes primero)
   */
  async findAll() {
    return this.prisma.eventoDeteccion.findMany({
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
      orderBy: {
        fecha_deteccion: 'desc',
      },
    });
  }

  /**
   * Obtiene un evento de detección específico por su ID
   * @param id - ID del evento a buscar
   * @returns El evento encontrado o lanza NotFoundException si no existe
   */
  async findOne(id: number) {
    const evento = await this.prisma.eventoDeteccion.findUnique({
      where: { id },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });

    if (!evento) {
      throw new NotFoundException(`Evento de detección con ID ${id} no encontrado`);
    }

    return evento;
  }

  /**
   * Actualiza un evento de detección existente
   * @param id - ID del evento a actualizar
   * @param updateEventoDeteccionDto - Datos actualizados del evento
   * @returns El evento actualizado con información de la cámara y modelo de IA
   */
  async update(id: number, updateEventoDeteccionDto: UpdateEventoDeteccionDto) {
    // Verificar que el evento existe
    await this.findOne(id);

    return this.prisma.eventoDeteccion.update({
      where: { id },
      data: {
        tipo_evento: updateEventoDeteccionDto.tipo_evento,
        confianza: updateEventoDeteccionDto.confianza,
        descripcion: updateEventoDeteccionDto.descripcion,
        datos_deteccion: updateEventoDeteccionDto.datos_deteccion,
        imagen_captura: updateEventoDeteccionDto.imagen_captura,
        estado: updateEventoDeteccionDto.estado as any,
        procesado: updateEventoDeteccionDto.procesado,
        fecha_procesamiento: updateEventoDeteccionDto.fecha_procesamiento 
          ? new Date(updateEventoDeteccionDto.fecha_procesamiento) 
          : null,
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });
  }

  /**
   * Elimina un evento de detección
   * @param id - ID del evento a eliminar
   * @returns El evento eliminado
   */
  async remove(id: number) {
    // Verificar que el evento existe
    await this.findOne(id);

    return this.prisma.eventoDeteccion.delete({
      where: { id },
    });
  }

  // Métodos adicionales útiles para el sistema de seguridad

  /**
   * Busca eventos por estado específico
   * @param estado - Estado del evento (NUEVO, PROCESANDO, PROCESADO, FALSO_POSITIVO, ERROR)
   * @returns Lista de eventos con el estado especificado
   */
  async findByEstado(estado: string) {
    return this.prisma.eventoDeteccion.findMany({
      where: { estado: estado as any },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
      orderBy: {
        fecha_deteccion: 'desc',
      },
    });
  }

  /**
   * Busca eventos por cámara específica
   * @param camaraId - ID de la cámara
   * @returns Lista de eventos detectados por la cámara especificada
   */
  async findByCamara(camaraId: number) {
    return this.prisma.eventoDeteccion.findMany({
      where: {
        camaraModeloIA: {
          camaraId: camaraId,
        },
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
      orderBy: {
        fecha_deteccion: 'desc',
      },
    });
  }

  /**
   * Busca eventos en un rango de fechas específico
   * @param fechaInicio - Fecha de inicio del rango
   * @param fechaFin - Fecha de fin del rango
   * @returns Lista de eventos dentro del rango de fechas especificado
   */
  async findByDateRange(fechaInicio: Date, fechaFin: Date) {
    return this.prisma.eventoDeteccion.findMany({
      where: {
        fecha_deteccion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
      orderBy: {
        fecha_deteccion: 'desc',
      },
    });
  }

  /**
   * Obtiene todos los eventos que no han sido procesados
   * @returns Lista de eventos pendientes de procesamiento
   */
  async getEventosNoProcesados() {
    return this.prisma.eventoDeteccion.findMany({
      where: {
        procesado: false,
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
      orderBy: {
        fecha_deteccion: 'desc',
      },
    });
  }

  /**
   * Marca un evento como procesado y actualiza su estado
   * @param id - ID del evento a marcar como procesado
   * @returns El evento actualizado con estado PROCESADO
   */
  async marcarComoProcesado(id: number) {
    await this.findOne(id);

    return this.prisma.eventoDeteccion.update({
      where: { id },
      data: {
        procesado: true,
        estado: 'PROCESADO',
        fecha_procesamiento: new Date(),
      },
      include: {
        camaraModeloIA: {
          include: {
            camara: true,
            modeloIA: true,
          },
        },
      },
    });
  }
}
