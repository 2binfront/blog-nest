import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CategoryService } from 'src/modules/category/category.service';
import { TagService } from 'src/modules/tag/tag.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Article, ArticleQuery } from 'src/dtos';
@Injectable()
export class ArticleService {
  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private prisma: PrismaService,
  ) {}
  async create(createArticleDto: Article) {
    return await this.prisma.post.create({
      data: {
        title: createArticleDto.title,
        category: {
          connect: {
            id: createArticleDto.category_id,
          },
        },
        content: createArticleDto.content,
        tags: {
          connect: (createArticleDto.tag_ids ?? []).map((tag) => ({ id: tag })),
        },
      },
    });
  }

  async findAll(query: ArticleQuery) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const where = {
      is_deleted: false,
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.tagId ? { tags: { some: { id: query.tagId } } } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        select: {
          id: true,
          create_date: true,
          write_date: true,
          title: true,
          category: true,
          tags: true,
          sequence: true,
        },
        orderBy: [{ create_date: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      select: {
        id: true,
        create_date: true,
        write_date: true,
        title: true,
        category: true,
        tags: true,
        sequence: true,
        content: true,
      },
    });
  }

  async update(id: number, updateArticleDto: Article) {
    return await this.prisma.post.update({
      where: {
        id,
        is_deleted: false,
      },
      data: {
        title: updateArticleDto.title,
        category: {
          connect: {
            id: updateArticleDto.category_id,
          },
        },
        content: updateArticleDto.content,
        write_date: new Date(),
        tags: {
          set: (updateArticleDto.tag_ids ?? []).map((tag) => ({ id: tag })),
        },
      },
      select: {
        id: true,
        create_date: true,
        write_date: true,
        title: true,
        category: true,
        tags: true,
        sequence: true,
        content: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
