-- CreateEnum
CREATE TYPE "EstadoEmpleado" AS ENUM ('ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'DESPEDIDO', 'VACACIONES');

-- CreateEnum
CREATE TYPE "TipoAcceso" AS ENUM ('ENTRADA', 'SALIDA');

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

    CONSTRAINT "accesos_empleados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empleados_ci_key" ON "empleados"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "empleados_email_key" ON "empleados"("email");

-- AddForeignKey
ALTER TABLE "accesos_empleados" ADD CONSTRAINT "accesos_empleados_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "empleados"("id") ON DELETE CASCADE ON UPDATE CASCADE;
