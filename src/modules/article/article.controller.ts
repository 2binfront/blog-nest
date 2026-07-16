import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Query, Req, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleService } from './article.service';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { Public } from 'src/modules/auth/constants';
import { Article, ArticleQuery } from 'src/dtos';
import { R2Service } from './r2.service';
@Controller()
@UseFilters(new HttpExceptionFilter())
export class ArticleController {
  constructor(private readonly articleService: ArticleService, private readonly r2Service: R2Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024, files: 1 },
    fileFilter: (_request, file, callback) => {
      callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype));
    },
  }))
  uploadImage(@UploadedFile() file: any, @Req() request: any) {
    if (!file) throw new BadRequestException('An image file is required');
    return this.r2Service.uploadImage(file, request.user.sub, request.ip);
  }

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
