-- CreateEnum
CREATE TYPE "TipoCamara" AS ENUM ('IP', 'WEBCAM', 'USB', 'RTSP', 'HTTP');

-- CreateEnum
CREATE TYPE "EstadoCamara" AS ENUM ('ACTIVA', 'INACTIVA', 'MANTENIMIENTO', 'FALLA', 'DESCONECTADA');

-- CreateEnum
CREATE TYPE "TipoModeloIA" AS ENUM ('DETECCION_FACIAL', 'RECONOCIMIENTO_FACIAL', 'VERIFICACION_FACIAL', 'DETECCION_ACTIVIDAD_SOSPECHOSA', 'DETECCION_INTRUSION_ZONA_RESTRINGIDA', 'DETECCION_ACTIVIDAD_VIOLENTA', 'DETECCION_MOVIMIENTO');

-- CreateEnum
CREATE TYPE "EstadoEvento" AS ENUM ('NUEVO', 'PROCESANDO', 'PROCESADO', 'FALSO_POSITIVO', 'ERROR');

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
CREATE UNIQUE INDEX "modelos_ia_nombre_key" ON "modelos_ia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "camaras_modelos_ia_camaraId_modeloIAId_key" ON "camaras_modelos_ia"("camaraId", "modeloIAId");

-- AddForeignKey
ALTER TABLE "camaras_modelos_ia" ADD CONSTRAINT "camaras_modelos_ia_camaraId_fkey" FOREIGN KEY ("camaraId") REFERENCES "camaras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "camaras_modelos_ia" ADD CONSTRAINT "camaras_modelos_ia_modeloIAId_fkey" FOREIGN KEY ("modeloIAId") REFERENCES "modelos_ia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_deteccion" ADD CONSTRAINT "eventos_deteccion_camaraModeloIAId_fkey" FOREIGN KEY ("camaraModeloIAId") REFERENCES "camaras_modelos_ia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
