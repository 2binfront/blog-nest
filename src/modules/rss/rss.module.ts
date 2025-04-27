// src/rss/rss.module.ts
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { ArticleModule } from '../article/article.module'; // 引入你的文章模块

@Module({
  imports: [ArticleModule],
  providers: [RssService],
  controllers: [RssController],
})
export class RssModule {}
