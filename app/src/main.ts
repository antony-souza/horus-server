import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (validationErrors = []) => {
      const errors = validationErrors.map(error => {
        return {
          property: error.property,
          messages: Object.values(error.constraints),
        };
      });
      return new BadRequestException({
        message: errors.map(error => error.messages).flat(),
        error: 'Bad Request',
        statusCode: 400,
      });
    },
  }));
  await app.listen(process.env.PORT as string);
}
console.log(process.env.PORT as string)
bootstrap();