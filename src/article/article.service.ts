import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Article, ArticleMeta, ArticleContent, ArticleContentDocument, ArticleMetaDocument } from './article.schema';
import DeleteResult from 'mongoose';
import { log } from 'console';
@Injectable()
export class ArticleService {
  @InjectModel('ArticleMeta') private metaModel: Model<ArticleMetaDocument>;
  @InjectModel('ArticleContent') private contentModel: Model<ArticleContentDocument>;

  async create(createArticleDto: Article) {
    try {
      console.log(createArticleDto);
      //   createArticleDto.create_time = new Date();
      //   createArticleDto.modified_time = new Date();
      const { content, ...resArticle } = createArticleDto;
      const res = await this.metaModel.create(resArticle);
      const res2 = await this.contentModel.create({ articleId: res._id, content: content });
      return res2;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const res = await this.metaModel.find();
    return res;
  }

  async findOne(id: string) {
    const res1 = await this.contentModel.find({ articleId: id }).exec();
    const res2 = await this.metaModel.find({ _id: id }).exec();
    const { category, tags, updatedAt, createdAt, title, _id } = res2[0];
    return {
      content: res1[0].content,
      category,
      updatedAt,
      tags,
      title,
      createdAt,
      _id,
    };
  }

  async update(id: string, updateArticleDto: Article) {
    // updateArticleDto.modified_time = new Date();
    const res0 = await this.metaModel
      .updateOne(
        { _id: id },
        {
          $set: {
            title: updateArticleDto.title,
            // modified_time: updateArticleDto.modified_time,
            category: updateArticleDto.category,
            tags: updateArticleDto.tags,
          },
        },
      )
      .exec();
    const res = await this.contentModel.updateOne({ articleId: id }, updateArticleDto).exec();
    return res;
  }

  async remove(id: string) {
    const res = await this.contentModel.deleteOne({ articleId: id }).exec();
    const res2 = await this.metaModel.deleteOne({ _id: id }).exec();
    if (res2.deletedCount === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
