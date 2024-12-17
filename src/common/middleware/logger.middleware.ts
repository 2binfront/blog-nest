import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
// import { Logger } from '@nestjs/common';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 1. 保存原始的 send 方法
    const originalSend = res.send;

    // 2. 创建一个变量来存储响应数据
    let responseBody: any;

    // 3. 重写 send 方法以捕获响应数据
    res.send = (body: any) => {
      responseBody = body;
      return originalSend.call(res, body);
    };

    // 4. 监听 'finish' 事件以获取响应状态码和内容
    res.on('finish', () => {
      const metadata = {
        method: req.method,
        // auth: req.headers.authorization,
        url: req.originalUrl,
        body: req.body,
        statusCode: res.statusCode,
        response: responseBody,
      };
      this.logger.http({
        message: 'HttpRequest',
        metadata,
      });
      //   const logger = new Logger('LoggerMiddleware');
      //   logger.error(`HttpRequest: ${JSON.stringify(metadata)}`);
    });

    // 5. 调用 next 中间件
    next();
  }
}
