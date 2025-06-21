/*
  Warnings:

  - The values [VERIFICACION_FACIAL] on the enum `TipoModeloIA` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoModeloIA_new" AS ENUM ('DETECCION_FACIAL', 'RECONOCIMIENTO_FACIAL', 'DETECCION_ACTIVIDAD_SOSPECHOSA', 'DETECCION_INTRUSION_ZONA_RESTRINGIDA', 'DETECCION_ACTIVIDAD_VIOLENTA', 'DETECCION_MOVIMIENTO');
ALTER TABLE "modelos_ia" ALTER COLUMN "tipo" TYPE "TipoModeloIA_new" USING ("tipo"::text::"TipoModeloIA_new");
ALTER TYPE "TipoModeloIA" RENAME TO "TipoModeloIA_old";
ALTER TYPE "TipoModeloIA_new" RENAME TO "TipoModeloIA";
DROP TYPE "TipoModeloIA_old";
COMMIT;
