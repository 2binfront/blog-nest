import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleMetaSchema, ArticleContentSchema } from './article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ArticleMeta', schema: ArticleMetaSchema, collection: 'ArticleMeta' },
      { name: 'ArticleContent', schema: ArticleContentSchema, collection: 'ArticleContent' },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
