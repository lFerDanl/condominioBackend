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
