import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViviendaModule } from './vivienda/vivienda.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResidenteModule } from './residente/residente.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { CamaraModule } from './camara/camara.module';
import { EventoDeteccionModule } from './evento-deteccion/evento-deteccion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ViviendaModule, ResidenteModule, EmpleadoModule, CamaraModule, EventoDeteccionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
