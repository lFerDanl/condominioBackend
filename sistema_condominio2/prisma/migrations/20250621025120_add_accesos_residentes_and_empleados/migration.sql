-- CreateEnum
CREATE TYPE "TipoAccesoResidente" AS ENUM ('INGRESO');

-- AlterTable
ALTER TABLE "accesos_empleados" ADD COLUMN     "metodo_acceso" TEXT;

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

-- AddForeignKey
ALTER TABLE "accesos_residentes" ADD CONSTRAINT "accesos_residentes_residenteId_fkey" FOREIGN KEY ("residenteId") REFERENCES "Residente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
