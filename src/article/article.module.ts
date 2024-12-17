import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleMetaSchema, ArticleContentSchema } from './article.schema';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [CategoryModule, TagModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
