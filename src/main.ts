import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Mi API documentatada')
  .setDescription('Esto es un tutorial de YT')
  .setVersion('1.1')
  .addTag('users')
  .addTag('auth')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
  Logger.log(`Server running on port ${port}`, 'main')
}
bootstrap();
