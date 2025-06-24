-- CreateEnum
CREATE TYPE "EstadoEmpleado" AS ENUM ('ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'DESPEDIDO', 'VACACIONES');

-- CreateEnum
CREATE TYPE "TipoAcceso" AS ENUM ('ENTRADA', 'SALIDA');

-- CreateEnum
CREATE TYPE "TipoAccesoResidente" AS ENUM ('INGRESO');

-- CreateEnum
CREATE TYPE "TipoCamara" AS ENUM ('IP', 'WEBCAM', 'USB', 'RTSP', 'HTTP');

-- CreateEnum
CREATE TYPE "EstadoCamara" AS ENUM ('ACTIVA', 'INACTIVA', 'MANTENIMIENTO', 'FALLA', 'DESCONECTADA');

-- CreateEnum
CREATE TYPE "TipoModeloIA" AS ENUM ('DETECCION_FACIAL', 'DETECCION_ACTIVIDAD_SOSPECHOSA', 'DETECCION_INTRUSION_ZONA_RESTRINGIDA', 'DETECCION_ACTIVIDAD_VIOLENTA', 'DETECCION_MOVIMIENTO');

-- CreateEnum
CREATE TYPE "EstadoEvento" AS ENUM ('NUEVO', 'PROCESANDO', 'PROCESADO', 'FALSO_POSITIVO', 'ERROR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'administrador',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "ci" TEXT NOT NULL,

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "viviendaId" INTEGER NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),
    "fecha_registro" TIMESTAMP(3),
    "foto_registrada" BOOLEAN,

    CONSTRAINT "Residente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vivienda" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "bloque" TEXT NOT NULL,
    "zona" TEXT NOT NULL,

    CONSTRAINT "Vivienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guardia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "Guardia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visita" (
    "id" SERIAL NOT NULL,
    "fecha_estimada_ingreso" TIMESTAMP(3) NOT NULL,
    "fecha_real_ingreso" TIMESTAMP(3),
    "fecha_salida" TIMESTAMP(3),
    "visitanteId" INTEGER NOT NULL,
    "residenteId" INTEGER NOT NULL,
    "guardiaId" INTEGER,
    "estadoVisitaId" INTEGER NOT NULL,

    CONSTRAINT "Visita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoVisita" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "EstadoVisita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QR" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "fecha_generacion" TIMESTAMP(3) NOT NULL,
    "fecha_expiracion" TIMESTAMP(3) NOT NULL,
    "visitaId" INTEGER NOT NULL,
    "estadoQRId" INTEGER NOT NULL,

    CONSTRAINT "QR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoQR" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "EstadoQR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empleados" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),
    "fecha_contratacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cargo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "salario" DECIMAL(10,2),
    "horario_entrada" TEXT,
    "horario_salida" TEXT,
    "dias_trabajo" TEXT,
    "estado" "EstadoEmpleado" NOT NULL DEFAULT 'ACTIVO',
    "foto_registrada" BOOLEAN NOT NULL DEFAULT false,
    "observaciones" TEXT,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesos_empleados" (
    "id" SERIAL NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_acceso" "TipoAcceso" NOT NULL,
    "ubicacion" TEXT,
    "metodo_acceso" TEXT,

    CONSTRAINT "accesos_empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesos_residentes" (
    "id" SERIAL NOT NULL,
    "residenteId" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_acceso" "TipoAccesoResidente" NOT NULL,
    "ubicacion" TEXT,
    "metodo_acceso" TEXT,

    CONSTRAINT "accesos_residentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camaras" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoCamara" NOT NULL,
    "estado" "EstadoCamara" NOT NULL DEFAULT 'ACTIVA',
    "ip_address" TEXT,
    "puerto" INTEGER,
    "username" TEXT,
    "password" TEXT,
    "url_stream" TEXT,
    "grabacion_activa" BOOLEAN NOT NULL DEFAULT false,
    "retencion_dias" INTEGER NOT NULL DEFAULT 30,
    "fecha_instalacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "camaras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelos_ia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoModeloIA" NOT NULL,
    "version" TEXT NOT NULL,
    "proveedor" TEXT,
    "configuracion" JSONB,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modelos_ia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camaras_modelos_ia" (
    "id" SERIAL NOT NULL,
    "camaraId" INTEGER NOT NULL,
    "modeloIAId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "configuracion" JSONB,
    "sensibilidad" DOUBLE PRECISION,
    "intervalo_analisis" INTEGER,
    "alertas_activas" BOOLEAN NOT NULL DEFAULT true,
    "notificar_guardia" BOOLEAN NOT NULL DEFAULT true,
    "notificar_admin" BOOLEAN NOT NULL DEFAULT false,
    "fecha_activacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "camaras_modelos_ia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_deteccion" (
    "id" SERIAL NOT NULL,
    "camaraModeloIAId" INTEGER NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "confianza" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT,
    "datos_deteccion" JSONB,
    "imagen_captura" TEXT,
    "estado" "EstadoEvento" NOT NULL DEFAULT 'NUEVO',
    "procesado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_deteccion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_procesamiento" TIMESTAMP(3),

    CONSTRAINT "eventos_deteccion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Residente_email_key" ON "Residente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "empleados_ci_key" ON "empleados"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "empleados_email_key" ON "empleados"("email");

-- CreateIndex
CREATE UNIQUE INDEX "modelos_ia_nombre_key" ON "modelos_ia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "camaras_modelos_ia_camaraId_modeloIAId_key" ON "camaras_modelos_ia"("camaraId", "modeloIAId");

-- AddForeignKey
ALTER TABLE "Residente" ADD CONSTRAINT "Residente_viviendaId_fkey" FOREIGN KEY ("viviendaId") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "Visitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_residenteId_fkey" FOREIGN KEY ("residenteId") REFERENCES "Residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_estadoVisitaId_fkey" FOREIGN KEY ("estadoVisitaId") REFERENCES "EstadoVisita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "Visita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_estadoQRId_fkey" FOREIGN KEY ("estadoQRId") REFERENCES "EstadoQR"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_empleados" ADD CONSTRAINT "accesos_empleados_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "empleados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_residentes" ADD CONSTRAINT "accesos_residentes_residenteId_fkey" FOREIGN KEY ("residenteId") REFERENCES "Residente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "camaras_modelos_ia" ADD CONSTRAINT "camaras_modelos_ia_camaraId_fkey" FOREIGN KEY ("camaraId") REFERENCES "camaras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "camaras_modelos_ia" ADD CONSTRAINT "camaras_modelos_ia_modeloIAId_fkey" FOREIGN KEY ("modeloIAId") REFERENCES "modelos_ia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_deteccion" ADD CONSTRAINT "eventos_deteccion_camaraModeloIAId_fkey" FOREIGN KEY ("camaraModeloIAId") REFERENCES "camaras_modelos_ia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
