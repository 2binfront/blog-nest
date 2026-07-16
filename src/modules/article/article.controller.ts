import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { Public } from 'src/modules/auth/constants';
import { Article, ArticleQuery } from 'src/dtos';
@Controller()
@UseFilters(new HttpExceptionFilter())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: Article) {
    return this.articleService.create(createArticleDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: ArticleQuery) {
    return this.articleService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: Article) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
