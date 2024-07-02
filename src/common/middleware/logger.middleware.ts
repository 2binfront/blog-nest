import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const metadata = {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      res: res.statusCode,
    };
    Logger.verbose({
      message: 'HttpRequest',
      metadata,
    });
    next();
  }
}
