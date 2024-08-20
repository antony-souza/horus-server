import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

config()

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001','http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    exposedHeaders: ['Content-Length', 'X-Knowledge'], // Cabeçalhos expostos
    credentials: true, 
    maxAge: 86400, // Tempo máximo para a preflight request
});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
  
}

bootstrap();
