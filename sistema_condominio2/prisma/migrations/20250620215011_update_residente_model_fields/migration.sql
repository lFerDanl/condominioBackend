/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Residente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Residente" ADD COLUMN     "email" TEXT,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "fecha_registro" TIMESTAMP(3),
ADD COLUMN     "foto_registrada" BOOLEAN,
ADD COLUMN     "telefono" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Residente_email_key" ON "Residente"("email");
