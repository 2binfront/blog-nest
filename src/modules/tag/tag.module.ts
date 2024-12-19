import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
