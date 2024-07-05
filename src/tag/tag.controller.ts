import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { Public } from 'src/auth/constants';
import { TagDocument } from './tag.schema';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @Post()
  createTags(@Body() tags: TagDocument[]) {
    return this.tagService.createTags(tags);
  }

  @Patch()
  updateTag(@Param() id: string, @Body() tags: TagDocument) {
    return this.tagService.patchTag(id, tags);
  }
}
