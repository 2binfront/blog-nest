import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception instanceof HttpException ? exception.getResponse() : 'Internal server error',
    });
  }
}
@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception.response);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message:
        exception.response.message instanceof Array
          ? exception.response.message.map((v) => {
              return { property: v.property, message: v.constraints };
            })
          : exception.response.message,
    });
  }
}

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception.response);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message:
        exception.response.message instanceof Array
          ? exception.response.message.map((v) => {
              return { property: v.property, message: v.constraints };
            })
          : exception.response.message,
    });
  }
}

@Catch(ForbiddenException)
export class ForbiddenFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception.response);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message:
        exception.response.message instanceof Array
          ? exception.response.message.map((v) => {
              return { property: v.property, message: v.constraints };
            })
          : exception.response.message,
    });
  }
}
