import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    await this.validateArticleReferences(createArticleDto);
    try {
      return await this.prisma.post.create({
        data: {
          title: createArticleDto.title,
          category: { connect: { id: createArticleDto.category_id } },
          content: createArticleDto.content,
          tags: { connect: (createArticleDto.tag_ids ?? []).map((tag) => ({ id: tag })) },
          write_date: new Date(),
          create_date: new Date(),
        },
      });
    } catch (error: any) {
      console.error('Article create failed', {
        name: error?.name,
        code: error?.code,
        target: error?.meta?.target,
        message: error?.message,
        categoryId: createArticleDto.category_id,
        tagCount: createArticleDto.tag_ids?.length ?? 0,
      });
      if (error?.code === 'P2002') {
        throw new ConflictException('Article ID sequence conflicts with an existing record; database sequence needs repair');
      }
      throw new BadRequestException('Article could not be saved');
    }
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
    await this.validateArticleReferences(updateArticleDto);
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

  private async validateArticleReferences(article: Article) {
    if (!article.title?.trim() || !article.content?.trim() || !Number.isInteger(article.category_id)) {
      throw new BadRequestException('Title, content and a valid category are required');
    }
    const category = await this.prisma.category.findFirst({
      where: { id: article.category_id, is_deleted: false },
      select: { id: true },
    });
    if (!category) {
      throw new BadRequestException(`Category ${article.category_id} does not exist or is deleted`);
    }
    const tagIds = [...new Set(article.tag_ids ?? [])];
    if (!tagIds.length) return;
    const tags = await this.prisma.tag.findMany({
      where: { id: { in: tagIds }, is_deleted: false },
      select: { id: true },
    });
    if (tags.length !== tagIds.length) {
      const validIds = new Set(tags.map((tag) => tag.id));
      const missing = tagIds.filter((id) => !validIds.has(id));
      throw new BadRequestException(`Tag(s) ${missing.join(', ')} do not exist or are deleted`);
    }
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
