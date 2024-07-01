import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();
const packageBody = require('../package.json');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose', 'log', 'error'] });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/blog');
  // 开启文档
  const options = new DocumentBuilder().setTitle('博客系统api').setDescription('2024.7.1').setVersion(packageBody.version).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(10010);
}
bootstrap();
