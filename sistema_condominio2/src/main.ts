import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Middleware para loggear todas las peticiones
  app.use((req, res, next) => {
    console.log(`🌐 ${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
  });
  
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
