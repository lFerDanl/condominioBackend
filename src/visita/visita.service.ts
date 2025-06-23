import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { CreateVisitaDirectaDto, VisitanteDataDto } from './dto/create-visita-directa.dto';
import { UpdateVisitaDirectaDto, UpdateVisitanteDataDto } from './dto/update-visita-directa.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VisitaService {
  private readonly logger = new Logger(VisitaService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateVisitaDto) {
    if (!data) {
      throw new BadRequestException('Los datos de la visita son requeridos');
    }

    this.logger.log(`Creando visita para visitante ID: ${data.visitanteId}`);

    // Verificar que el visitante existe
    const visitante = await this.prisma.visitante.findUnique({
      where: { id: data.visitanteId },
    });
    if (!visitante) {
      throw new NotFoundException(`Visitante con ID ${data.visitanteId} no encontrado`);
    }

    // Verificar que el residente existe
    const residente = await this.prisma.residente.findUnique({
      where: { id: data.residenteId },
    });
    if (!residente) {
      throw new NotFoundException(`Residente con ID ${data.residenteId} no encontrado`);
    }

    // Verificar que el estado de visita existe
    const estadoVisita = await this.prisma.estadoVisita.findUnique({
      where: { id: data.estadoVisitaId },
    });
    if (!estadoVisita) {
      throw new NotFoundException(`Estado de visita con ID ${data.estadoVisitaId} no encontrado`);
    }

    // Verificar que el guardia existe si se proporciona
    if (data.guardiaId) {
      const guardia = await this.prisma.guardia.findUnique({
        where: { id: data.guardiaId },
      });
      if (!guardia) {
        throw new NotFoundException(`Guardia con ID ${data.guardiaId} no encontrado`);
      }
    }

    // Convertir fechas string a Date
    const visitaData = {
      ...data,
      fecha_estimada_ingreso: new Date(data.fecha_estimada_ingreso),
      fecha_real_ingreso: data.fecha_real_ingreso ? new Date(data.fecha_real_ingreso) : null,
      fecha_salida: data.fecha_salida ? new Date(data.fecha_salida) : null,
    };

    return this.prisma.visita.create({ 
      data: visitaData,
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  async findAll() {
    this.logger.log('Listando todas las visitas');
    return this.prisma.visita.findMany({
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  async findOne(id: number) {
    const visita = await this.prisma.visita.findUnique({ 
      where: { id },
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
    
    if (!visita) {
      throw new NotFoundException(`Visita con ID ${id} no encontrada`);
    }
    
    return visita;
  }

  async update(id: number, data: UpdateVisitaDto) {
    this.logger.log(`Actualizando visita ID: ${id}`);
    await this.findOne(id);

    // Verificar que el visitante existe si se proporciona
    if (data.visitanteId) {
      const visitante = await this.prisma.visitante.findUnique({
        where: { id: data.visitanteId },
      });
      if (!visitante) {
        throw new NotFoundException(`Visitante con ID ${data.visitanteId} no encontrado`);
      }
    }

    // Verificar que el residente existe si se proporciona
    if (data.residenteId) {
      const residente = await this.prisma.residente.findUnique({
        where: { id: data.residenteId },
      });
      if (!residente) {
        throw new NotFoundException(`Residente con ID ${data.residenteId} no encontrado`);
      }
    }

    // Verificar que el estado de visita existe si se proporciona
    if (data.estadoVisitaId) {
      const estadoVisita = await this.prisma.estadoVisita.findUnique({
        where: { id: data.estadoVisitaId },
      });
      if (!estadoVisita) {
        throw new NotFoundException(`Estado de visita con ID ${data.estadoVisitaId} no encontrado`);
      }
    }

    // Verificar que el guardia existe si se proporciona
    if (data.guardiaId) {
      const guardia = await this.prisma.guardia.findUnique({
        where: { id: data.guardiaId },
      });
      if (!guardia) {
        throw new NotFoundException(`Guardia con ID ${data.guardiaId} no encontrado`);
      }
    }

    // Convertir fechas string a Date si se proporcionan
    const updateData: any = { ...data };
    if (data.fecha_estimada_ingreso) {
      updateData.fecha_estimada_ingreso = new Date(data.fecha_estimada_ingreso);
    }
    if (data.fecha_real_ingreso) {
      updateData.fecha_real_ingreso = new Date(data.fecha_real_ingreso);
    }
    if (data.fecha_salida) {
      updateData.fecha_salida = new Date(data.fecha_salida);
    }

    return this.prisma.visita.update({
      where: { id },
      data: updateData,
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  async remove(id: number) {
    this.logger.log(`Eliminando visita ID: ${id}`);
    await this.findOne(id);
    return this.prisma.visita.delete({ where: { id } });
  }

  // Métodos adicionales útiles
  async findByVisitante(visitanteId: number) {
    this.logger.log(`Buscando visitas del visitante ID: ${visitanteId}`);
    
    const visitante = await this.prisma.visitante.findUnique({
      where: { id: visitanteId },
    });
    if (!visitante) {
      throw new NotFoundException(`Visitante con ID ${visitanteId} no encontrado`);
    }

    return this.prisma.visita.findMany({
      where: { visitanteId },
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  async findByResidente(residenteId: number) {
    this.logger.log(`Buscando visitas del residente ID: ${residenteId}`);
    
    const residente = await this.prisma.residente.findUnique({
      where: { id: residenteId },
    });
    if (!residente) {
      throw new NotFoundException(`Residente con ID ${residenteId} no encontrado`);
    }

    return this.prisma.visita.findMany({
      where: { residenteId },
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  async findByEstado(estadoVisitaId: number) {
    this.logger.log(`Buscando visitas con estado ID: ${estadoVisitaId}`);
    
    const estadoVisita = await this.prisma.estadoVisita.findUnique({
      where: { id: estadoVisitaId },
    });
    if (!estadoVisita) {
      throw new NotFoundException(`Estado de visita con ID ${estadoVisitaId} no encontrado`);
    }

    return this.prisma.visita.findMany({
      where: { estadoVisitaId },
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }
// funcion clave para api******************************************************************
  async createDirecta(data: CreateVisitaDirectaDto) {
    if (!data) {
      throw new BadRequestException('Los datos de la visita directa son requeridos');
    }

    this.logger.log(`Creando visita directa para visitante: ${data.visitante.nombre} ${data.visitante.apellido_paterno}`);

    // Validar entidades relacionadas
    await this.validarEntidadesRelacionadas(data);

    // Usar transacción para crear visitante (si no existe) y visita
    return this.prisma.$transaction(async (prisma) => {
      const visitante = await this.obtenerOCrearVisitante(prisma, data.visitante);
      const visita = await this.crearVisita(prisma, data, visitante.id);
      
      return visita;
    });
  }

  /**
   * Actualiza una visita y opcionalmente los datos del visitante asociado de forma atómica.
   * @param id - El ID de la visita a actualizar.
   * @param data - Los datos para actualizar.
   * @returns La visita actualizada con los datos del visitante.
   * @throws NotFoundException si la visita no existe.
   */
  async updateDirecta(id: number, data: UpdateVisitaDirectaDto) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Se requiere al menos un campo para actualizar.');
    }

    this.logger.log(`Iniciando actualización para visita directa ID: ${id}`);

    const visitaExistente = await this.prisma.visita.findUnique({
      where: { id },
      include: {
        estadoVisita: true,
        visitante: true, // Incluir para el ID
      },
    });

    if (!visitaExistente) {
      throw new NotFoundException(`Visita con ID ${id} no encontrada.`);
    }

    // Usar transacción para actualizar de forma segura
    return this.prisma.$transaction(async (prisma) => {
      // 1. Actualizar el visitante si se proporcionan datos
      if (data.visitante) {
        await this.actualizarVisitante(
          prisma as any, // Cast para compatibilidad con el tipo de transacción
          visitaExistente.visitanteId,
          data.visitante,
        );
      }

      // 2. Preparar y actualizar los datos de la visita
      const updateDataVisita: any = {};

      // Campos que se pueden actualizar
      if (data.fecha_estimada_ingreso) {
        updateDataVisita.fecha_estimada_ingreso = new Date(data.fecha_estimada_ingreso);
      }
      if (data.fecha_real_ingreso) {
        updateDataVisita.fecha_real_ingreso = new Date(data.fecha_real_ingreso);
      }
      if (data.fecha_salida) {
        updateDataVisita.fecha_salida = new Date(data.fecha_salida);
      }
      if (data.estadoVisitaId) {
        const estado = await prisma.estadoVisita.findUnique({ where: { id: data.estadoVisitaId } });
        if (!estado) throw new NotFoundException(`Estado de visita con ID ${data.estadoVisitaId} no encontrado`);
        updateDataVisita.estadoVisitaId = data.estadoVisitaId;
      }
      if (data.motivo_visita !== undefined) {
        updateDataVisita.motivo_visita = data.motivo_visita;
      }
      if (data.residenteId) {
        const residente = await prisma.residente.findUnique({ where: { id: data.residenteId } });
        if (!residente) throw new NotFoundException(`Residente con ID ${data.residenteId} no encontrado`);
        updateDataVisita.residenteId = data.residenteId;
      }
      if (data.guardiaId !== undefined) {
        if (data.guardiaId) {
          const guardia = await prisma.guardia.findUnique({ where: { id: data.guardiaId } });
          if (!guardia) throw new NotFoundException(`Guardia con ID ${data.guardiaId} no encontrado`);
        }
        updateDataVisita.guardiaId = data.guardiaId;
      }

      // Actualizar la visita solo si hay datos que cambiar
      if (Object.keys(updateDataVisita).length > 0) {
        return prisma.visita.update({
          where: { id },
          data: updateDataVisita,
          include: {
            visitante: true,
            residente: true,
            guardia: true,
            estadoVisita: true,
          },
        });
      }

      // Si solo se actualizó el visitante, o no se actualizó nada, recargamos y devolvemos la visita
      return this.prisma.visita.findUnique({
        where: { id },
        include: {
          visitante: true,
          residente: true,
          guardia: true,
          estadoVisita: true,
        },
      });
    });
  }

  /**
   * Valida que todas las entidades relacionadas existan para una nueva visita
   */
  private async validarEntidadesRelacionadas(data: CreateVisitaDirectaDto): Promise<void> {
    // Verificar residente
    const residente = await this.prisma.residente.findUnique({
      where: { id: data.residenteId },
    });
    if (!residente) {
      throw new NotFoundException(`Residente con ID ${data.residenteId} no encontrado`);
    }

    // Verificar estado de visita si se proporciona
    if (data.estadoVisitaId) {
      const estadoVisita = await this.prisma.estadoVisita.findUnique({
        where: { id: data.estadoVisitaId },
      });
      if (!estadoVisita) {
        throw new NotFoundException(`Estado de visita con ID ${data.estadoVisitaId} no encontrado`);
      }
    }

    // Verificar guardia si se proporciona
    if (data.guardiaId) {
      const guardia = await this.prisma.guardia.findUnique({
        where: { id: data.guardiaId },
      });
      if (!guardia) {
        throw new NotFoundException(`Guardia con ID ${data.guardiaId} no encontrado`);
      }
    }
  }

  /**
   * Obtiene un visitante existente o crea uno nuevo
   */
  private async obtenerOCrearVisitante(
    prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>, 
    datosVisitante: VisitanteDataDto
  ) {
    // Buscar visitante existente por CI
    let visitante = await prisma.visitante.findUnique({
      where: { ci: datosVisitante.ci },
    });

    if (!visitante) {
      // Crear nuevo visitante
      this.logger.log(`Visitante no encontrado, creando nuevo visitante con CI: ${datosVisitante.ci}`);
      visitante = await prisma.visitante.create({
        data: datosVisitante,
      });
    } else {
      // Actualizar datos del visitante existente
      this.logger.log(`Visitante encontrado con CI: ${datosVisitante.ci}, actualizando datos`);
      visitante = await prisma.visitante.update({
        where: { id: visitante.id },
        data: {
          nombre: datosVisitante.nombre,
          apellido_paterno: datosVisitante.apellido_paterno,
          apellido_materno: datosVisitante.apellido_materno,
        },
      });
    }

    return visitante;
  }

  /**
   * Crea una nueva visita
   */
  private async crearVisita(
    prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>, 
    data: CreateVisitaDirectaDto, 
    visitanteId: number
  ) {
    const visitaData = {
      fecha_estimada_ingreso: new Date(data.fecha_estimada_ingreso),
      fecha_real_ingreso: data.fecha_real_ingreso ? new Date(data.fecha_real_ingreso) : null,
      fecha_salida: data.fecha_salida ? new Date(data.fecha_salida) : null,
      motivo_visita: data.motivo_visita,
      visitanteId,
      residenteId: data.residenteId,
      guardiaId: data.guardiaId,
      estadoVisitaId: data.estadoVisitaId || 1,
      modalidadId: 2, // Asignar automáticamente modalidad DIRECTO (ID: 2)
    };

    return prisma.visita.create({
      data: visitaData,
      include: {
        visitante: true,
        residente: true,
        guardia: true,
        estadoVisita: true,
      }
    });
  }

  /**
   * Actualiza un visitante existente
   */
  private async actualizarVisitante(
    prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    visitanteId: number,
    datosVisitante: UpdateVisitanteDataDto
  ) {
    this.logger.log(`Actualizando visitante ID: ${visitanteId}`);

    const updateData: any = {};
    
    if (datosVisitante.nombre) updateData.nombre = datosVisitante.nombre;
    if (datosVisitante.apellido_paterno) updateData.apellido_paterno = datosVisitante.apellido_paterno;
    if (datosVisitante.apellido_materno) updateData.apellido_materno = datosVisitante.apellido_materno;
    if (datosVisitante.ci) updateData.ci = datosVisitante.ci;

    // Validar que la nueva CI no exista en otro visitante
    if (datosVisitante.ci) {
      const existeCI = await prisma.visitante.findFirst({
        where: {
          ci: datosVisitante.ci,
          NOT: { id: visitanteId },
        },
      });

      if (existeCI) {
        throw new BadRequestException(`El CI ${datosVisitante.ci} ya está registrado en otro visitante`);
      }
    }

    return prisma.visitante.update({
      where: { id: visitanteId },
      data: updateData,
    });
  }

  /**
   * Genera una vista formateada para una visita específica por su ID.
   * @param visitaId - El ID de la visita a consultar.
   * @returns Una promesa que resuelve a un objeto de visita formateado.
   * @throws NotFoundException si la visita o sus datos relacionados no se encuentran.
   */
  async vistaVisita(visitaId: number): Promise<any> {
    this.logger.log(`Generando vista para la visita con ID: ${visitaId}`);

    const visita = await this.prisma.visita.findUnique({
      where: { id: visitaId },
      include: {
        visitante: true,
        residente: {
          include: {
            vivienda: true,
          },
        },
        estadoVisita: true,
      },
    });

    if (!visita) {
      throw new NotFoundException(`No se encontró la visita con ID ${visitaId}`);
    }

    const visitaFormateada = this._formatVisita(visita);

    if (!visitaFormateada) {
      throw new NotFoundException(
        `No se pudieron cargar los datos completos para la visita con ID ${visitaId}. Verifique que el residente y el visitante asociados existan.`
      );
    }

    return visitaFormateada;
  }

  /**
   * Formatea una única visita en la estructura de la vista general.
   * @param visita - El objeto de la visita con sus relaciones incluidas.
   * @returns El objeto de visita formateado, o null si faltan datos.
   */
  private _formatVisita(visita: any): any {
    if (!visita.visitante || !visita.residente || !visita.residente.vivienda || !visita.estadoVisita) {
      return null;
    }
    
    return {
      id: visita.id,
      nombre_completo_visitante: `${visita.visitante.nombre} ${visita.visitante.apellido_paterno} ${visita.visitante.apellido_materno}`.trim(),
      ci_visitante: visita.visitante.ci,
      nombre_completo_residente: `${visita.residente.nombre} ${visita.residente.apellido_paterno} ${visita.residente.apellido_materno}`.trim(),
      vivienda_residente: `Bloque ${visita.residente.vivienda.bloque}, N° ${visita.residente.vivienda.numero}`,
      fecha_hora_ingreso: visita.fecha_real_ingreso,
      fecha_hora_salida: visita.fecha_salida,
      estado_visita: visita.estadoVisita.nombre,
      motivo_visita: visita.motivo_visita,
    };
  }
} 