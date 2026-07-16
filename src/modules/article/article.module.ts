import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CategoryModule } from 'src/modules/category/category.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { R2Service } from './r2.service';

@Module({
  imports: [CategoryModule, TagModule],
  controllers: [ArticleController],
  providers: [ArticleService, R2Service],
})
export class ArticleModule {}
