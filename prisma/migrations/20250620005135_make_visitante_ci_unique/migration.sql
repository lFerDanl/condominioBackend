/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Visitante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Visitante_ci_key" ON "Visitante"("ci");
