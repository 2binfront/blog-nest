import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagDocument } from './tag.schema';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  getTags() {
    return this.tagModel.find().exec();
  }

  createTags(tags: TagDocument[]) {
    return this.tagModel.create(tags);
  }

  patchTag(id: string, tag: TagDocument) {
    return this.tagModel.findByIdAndUpdate(id, tag, { new: true });
  }

  findById(id: string) {
    return this.tagModel.find({ _id: id }).exec();
  }

  findMany(ids: string[]) {
    return this.tagModel.find({ _id: { $in: ids } }).exec();
  }
}
