import { Body, Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Public } from 'src/modules/auth/constants';
import { Tag } from 'src/dtos';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @Post()
  createTags(@Body() tags: Tag[]) {
    return this.tagService.createTags(tags);
  }

  @Patch()
  updateTag(@Param() id: string, @Body() tag: Tag) {
    return this.tagService.patchTag(+id, tag);
  }

  @Delete()
  deleteTag(@Param() id: string) {
    return this.tagService.deleteTag(+id);
  }
}
