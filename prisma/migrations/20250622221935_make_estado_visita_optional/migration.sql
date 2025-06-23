-- DropForeignKey
ALTER TABLE "Visita" DROP CONSTRAINT "Visita_estadoVisitaId_fkey";

-- AlterTable
ALTER TABLE "Visita" ALTER COLUMN "estadoVisitaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_estadoVisitaId_fkey" FOREIGN KEY ("estadoVisitaId") REFERENCES "EstadoVisita"("id") ON DELETE SET NULL ON UPDATE CASCADE;
