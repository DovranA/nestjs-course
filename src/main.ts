import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  // SwaggerModule.setup('api', app, documentFactory);
  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
