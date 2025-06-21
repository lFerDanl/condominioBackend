import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Crear viviendas
  const vivienda1 = await prisma.vivienda.upsert({
    where: { id: 1 },
    update: {},
    create: {
      numero: '101',
      bloque: 'A',
      zona: 'Norte',
    },
  });

  const vivienda2 = await prisma.vivienda.upsert({
    where: { id: 2 },
    update: {},
    create: {
      numero: '102',
      bloque: 'B',
      zona: 'Sur',
    },
  });

  console.log('Viviendas created.');

  // Crear residentes
  await prisma.residente.upsert({
    where: { email: 'juan.perez@example.com' },
    update: {},
    create: {
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Gomez',
      ci: '1234567',
      viviendaId: vivienda1.id,
      email: 'juan.perez@example.com',
      telefono: '77711111',
      fecha_nacimiento: new Date('1990-01-15T00:00:00Z'),
      fecha_registro: new Date(),
      foto_registrada: false,
    },
  });

  await prisma.residente.upsert({
    where: { email: 'ana.lopez@example.com' },
    update: {},
    create: {
      nombre: 'Ana',
      apellido_paterno: 'Lopez',
      apellido_materno: 'Diaz',
      ci: '7654321',
      viviendaId: vivienda1.id,
      email: 'ana.lopez@example.com',
      telefono: '77722222',
      fecha_nacimiento: new Date('1992-05-20T00:00:00Z'),
      fecha_registro: new Date(),
      foto_registrada: true,
    },
  });

  await prisma.residente.upsert({
    where: { email: 'carlos.sanchez@example.com' },
    update: {},
    create: {
      nombre: 'Carlos',
      apellido_paterno: 'Sanchez',
      apellido_materno: 'Roca',
      ci: '9876543',
      viviendaId: vivienda2.id,
      email: 'carlos.sanchez@example.com',
      telefono: '77733333',
      fecha_nacimiento: new Date('1985-11-30T00:00:00Z'),
      fecha_registro: new Date(),
      foto_registrada: false,
    },
  });

  console.log('Residentes created.');

  // Crear empleados del condominio
  await prisma.empleado.upsert({
    where: { ci: '1111111' },
    update: {},
    create: {
      nombre: 'Roberto',
      apellido_paterno: 'Garcia',
      apellido_materno: 'Lopez',
      ci: '1111111',
      telefono: '77744444',
      email: 'roberto.garcia@condominio.com',
      fecha_nacimiento: new Date('1980-03-15T00:00:00Z'),
      fecha_contratacion: new Date('2023-01-15T00:00:00Z'),
      cargo: 'Guardia de Seguridad',
      departamento: 'Seguridad',
      salario: 3500.00,
      horario_entrada: '06:00',
      horario_salida: '18:00',
      dias_trabajo: 'Lunes a Domingo',
      estado: 'ACTIVO',
      foto_registrada: true,
      observaciones: 'Guardia del turno de día',
    },
  });

  await prisma.empleado.upsert({
    where: { ci: '2222222' },
    update: {},
    create: {
      nombre: 'Maria',
      apellido_paterno: 'Rodriguez',
      apellido_materno: 'Vargas',
      ci: '2222222',
      telefono: '77755555',
      email: 'maria.rodriguez@condominio.com',
      fecha_nacimiento: new Date('1985-07-22T00:00:00Z'),
      fecha_contratacion: new Date('2023-02-01T00:00:00Z'),
      cargo: 'Guardia de Seguridad',
      departamento: 'Seguridad',
      salario: 3500.00,
      horario_entrada: '18:00',
      horario_salida: '06:00',
      dias_trabajo: 'Lunes a Domingo',
      estado: 'ACTIVO',
      foto_registrada: true,
      observaciones: 'Guardia del turno de noche',
    },
  });

  await prisma.empleado.upsert({
    where: { ci: '3333333' },
    update: {},
    create: {
      nombre: 'Pedro',
      apellido_paterno: 'Martinez',
      apellido_materno: 'Flores',
      ci: '3333333',
      telefono: '77766666',
      email: 'pedro.martinez@condominio.com',
      fecha_nacimiento: new Date('1975-11-08T00:00:00Z'),
      fecha_contratacion: new Date('2022-08-10T00:00:00Z'),
      cargo: 'Mantenimiento',
      departamento: 'Mantenimiento',
      salario: 4000.00,
      horario_entrada: '08:00',
      horario_salida: '17:00',
      dias_trabajo: 'Lunes a Viernes',
      estado: 'ACTIVO',
      foto_registrada: true,
      observaciones: 'Encargado de mantenimiento general',
    },
  });

  await prisma.empleado.upsert({
    where: { ci: '4444444' },
    update: {},
    create: {
      nombre: 'Carmen',
      apellido_paterno: 'Torres',
      apellido_materno: 'Rojas',
      ci: '4444444',
      telefono: '77777777',
      email: 'carmen.torres@condominio.com',
      fecha_nacimiento: new Date('1988-04-12T00:00:00Z'),
      fecha_contratacion: new Date('2023-03-01T00:00:00Z'),
      cargo: 'Limpieza',
      departamento: 'Limpieza',
      salario: 2800.00,
      horario_entrada: '07:00',
      horario_salida: '15:00',
      dias_trabajo: 'Lunes a Sábado',
      estado: 'ACTIVO',
      foto_registrada: true,
      observaciones: 'Encargada de limpieza de áreas comunes',
    },
  });

  await prisma.empleado.upsert({
    where: { ci: '5555555' },
    update: {},
    create: {
      nombre: 'Luis',
      apellido_paterno: 'Herrera',
      apellido_materno: 'Mendoza',
      ci: '5555555',
      telefono: '77788888',
      email: 'luis.herrera@condominio.com',
      fecha_nacimiento: new Date('1970-09-30T00:00:00Z'),
      fecha_contratacion: new Date('2021-12-01T00:00:00Z'),
      cargo: 'Administrador',
      departamento: 'Administración',
      salario: 6000.00,
      horario_entrada: '08:00',
      horario_salida: '18:00',
      dias_trabajo: 'Lunes a Viernes',
      estado: 'ACTIVO',
      foto_registrada: true,
      observaciones: 'Administrador general del condominio',
    },
  });

  console.log('Empleados created.');

  // Crear modelos de IA para detección facial, reconocimiento facial y verificación facial
  await prisma.modeloIA.upsert({
    where: { nombre: 'Detección Facial CompreFace' },
    update: {},
    create: {
      nombre: 'Detección Facial CompreFace',
      descripcion: 'Modelo de detección facial basado en CompreFace para identificar rostros en tiempo real',
      tipo: 'DETECCION_FACIAL',
      version: '2.0',
      proveedor: 'CompreFace',
      configuracion: undefined,
      activo: true,
    },
  });

  await prisma.modeloIA.upsert({
    where: { nombre: 'Detección de Movimiento' },
    update: {},
    create: {
      nombre: 'Detección de Movimiento',
      descripcion: 'Modelo para detectar movimiento en áreas restringidas o fuera de horario',
      tipo: 'DETECCION_MOVIMIENTO',
      version: '1.0',
      proveedor: 'OpenCV',
      configuracion: undefined,
      activo: true,
    },
  });

  await prisma.modeloIA.upsert({
    where: { nombre: 'Detección de Actividad Sospechosa' },
    update: {},
    create: {
      nombre: 'Detección de Actividad Sospechosa',
      descripcion: 'Modelo para detectar comportamientos o actividades sospechosas en el condominio',
      tipo: 'DETECCION_ACTIVIDAD_SOSPECHOSA',
      version: '1.0',
      proveedor: 'Custom',
      configuracion: undefined,
      activo: true,
    },
  });

  await prisma.modeloIA.upsert({
    where: { nombre: 'Detección de Intrusión en Zona Restringida' },
    update: {},
    create: {
      nombre: 'Detección de Intrusión en Zona Restringida',
      descripcion: 'Modelo para detectar acceso no autorizado a zonas restringidas del condominio',
      tipo: 'DETECCION_INTRUSION_ZONA_RESTRINGIDA',
      version: '1.0',
      proveedor: 'Custom',
      configuracion: undefined,
      activo: true,
    },
  });

  console.log('Modelos de IA created.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 