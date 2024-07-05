import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema, collection: 'Tag' }])],
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
