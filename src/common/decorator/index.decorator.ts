import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { PaginationParam, PrismaPaginationParam } from 'src/dtos';

/**
 * 分页参数获取，重新挂载
 */
export const Pagination = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  //兼容性保护， 原python框架中一直用的是order_by字段，后续保证order_by和oderBy字段都可以用
  request.query.order_by ? null : (request.query.order_by = request.query.orderBy);
  const isUsablePagination = request.query.page && request.query.size;
  return {
    skip: isUsablePagination ? (request.query.page - 1) * request.query.size : undefined,
    take: isUsablePagination ? Number(request.query.size) : undefined,
    orderBy: request.query.order_by
      ? request.query.order_by[0] == '-'
        ? { [request.query.order_by.slice(1)]: 'desc' }
        : { [request.query.order_by]: 'asc' }
      : undefined,
    size: isUsablePagination ? Number(request.query.size) : undefined,
    page: isUsablePagination ? Number(request.query.page) : undefined,
  };
});

/**
 * 分页参数直接挂载到prisma 的 findmany中
 */
export const prismaPaging = (pageParam: PaginationParam = {}, time = null): PrismaPaginationParam => {
  return {
    skip: pageParam.skip,
    take: pageParam.take,
    orderBy: pageParam.orderBy || (time ? { [time]: 'desc' } : undefined),
  };
};
