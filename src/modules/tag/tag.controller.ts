import { Body, Controller, Get, Post, Patch, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Public } from 'src/modules/auth/constants';
import { Tag } from 'src/dtos';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @Post()
  createTags(@Body() tag: Tag) {
    return this.tagService.createTags(tag);
  }

  @Patch()
  updateTag(@Query('id') id: string, @Body() tag: Tag) {
    return this.tagService.patchTag(+id, tag);
  }

  @Delete()
  deleteTag(@Query('id') id: string) {
    return this.tagService.deleteTag(+id);
  }
}
