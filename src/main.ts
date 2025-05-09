import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './util/swagger.util';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
