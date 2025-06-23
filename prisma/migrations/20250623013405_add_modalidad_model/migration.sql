-- AlterTable
ALTER TABLE "Visita" ADD COLUMN     "modalidadId" INTEGER;

-- CreateTable
CREATE TABLE "modalidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "modalidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_modalidadId_fkey" FOREIGN KEY ("modalidadId") REFERENCES "modalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;
