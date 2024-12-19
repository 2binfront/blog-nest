import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { BadRequestFilter, NotFoundFilter, ForbiddenFilter } from './common/filters/http-exception.filter';

dotenv.config();
const packageBody = require('../package.json');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose', 'log', 'error'] });
  app.useGlobalPipes(new ValidationPipe());
  //   app.setGlobalPrefix('api/blog');
  // 开启文档
  const options = new DocumentBuilder().setTitle('博客系统api').setDescription('2024.7.1').setVersion(packageBody.version).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  // 全局异常过滤
  app.useGlobalFilters(new BadRequestFilter());
  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalFilters(new ForbiddenFilter());

  // 替换原有内置logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3001);
  // 打印当前可用路由
  const server = app.getHttpServer();
  const router = (server as any)._events.request._router;
  const availableRoutes: Array<object> = [];
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route might be undefined if the middleware is a function
      availableRoutes.push({
        path: middleware.route?.path,
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
      });
    }
  });
  console.log(availableRoutes);
}
bootstrap();
