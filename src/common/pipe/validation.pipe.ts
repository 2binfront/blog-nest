import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    //   plainToClass已弃用，转换为实例理论上也可以在clas定义中附加方法，那User类的几个计算属性可以换一个方式写了
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    // console.error(errors);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    //   return value就只做验证不做转换
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
