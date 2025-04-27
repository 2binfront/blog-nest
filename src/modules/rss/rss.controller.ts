// src/rss/rss.controller.ts
import { Controller, Get, Header } from '@nestjs/common';
import { RssService } from './rss.service';
import { Public } from '../auth/constants';
@Public()
@Controller()
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get('rss.xml')
  @Header('Content-Type', 'application/xml')
  async getRssFeed(): Promise<string> {
    return this.rssService.generateRssFeed();
  }

  // 可选：添加Atom格式
  @Get('atom.xml')
  @Header('Content-Type', 'application/atom+xml')
  async getAtomFeed(): Promise<string> {
    const feed = await this.rssService.generateRssFeed();
    // 如果需要Atom格式，feed库也支持：return feed.atom1();
    return feed;
  }
}
