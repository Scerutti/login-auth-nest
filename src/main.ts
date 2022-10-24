import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

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
  await app.listen(port).then(() => console.log(`Server listen on port ${port}`));
}
bootstrap();
