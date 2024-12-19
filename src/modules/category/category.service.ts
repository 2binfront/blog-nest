import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Category } from 'src/dtos';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    return await this.prisma.category.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

  async create(category: Category) {
    const res = this.prisma.category.create({
      data: {
        name: category.name,
        sequence: category.sequence,
      },
    });
    return res;
  }

  async patchCategory(id: number, category: Category) {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: category.name,
        sequence: category.sequence,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
