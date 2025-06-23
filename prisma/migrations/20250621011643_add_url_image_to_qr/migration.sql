/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `QR` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url_image` to the `QR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QR" ADD COLUMN     "url_image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QR_codigo_key" ON "QR"("codigo");
