import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Tag } from 'src/dtos';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  async getTags() {
    return await this.prisma.tag.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

  async createTags(tags: Tag[]) {
    return await this.prisma.tag.createMany({
      data: tags.map((tag) => ({
        name: tag.name,
      })),
    });
  }

  async patchTag(id: number, tag: Tag) {
    return await this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        name: tag.name,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findMany(ids: number[]) {
    return await this.prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async deleteTag(id: number) {
    return await this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
