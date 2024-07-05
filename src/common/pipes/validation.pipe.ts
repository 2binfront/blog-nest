import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    const object = new metatype();
    const keys = Object.getOwnPropertyNames(object);
    for (const key of keys) {
      if (typeof value[key] !== 'undefined') {
        object[key] = value[key];
      }
    }
  }
}
