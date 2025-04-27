// src/rss/rss.service.ts
import { Injectable } from '@nestjs/common';
import { Feed } from 'feed';
import { ArticleService } from '../article/article.service'; // 假设你有一个文章服务
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RssService {
  constructor(private readonly prisma: PrismaService) {}

  async generateRssFeed(): Promise<string> {
    // 获取博客的基本信息
    const siteUrl = 'https://2binfront.com';
    const posts = await this.prisma.post.findMany(); // 获取所有文章

    // 创建Feed实例
    const feed = new Feed({
      title: '你的博客名称',
      description: '博客的描述信息',
      id: siteUrl,
      link: siteUrl,
      language: 'zh', // 或其他语言
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      updated: posts.length > 0 ? new Date(posts[0].write_date) : new Date(),
      author: {
        name: '你的名字',
        email: 'your@email.com',
        link: siteUrl,
      },
    });

    // 添加文章到Feed
    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${siteUrl}/article?id=${post.id}`,
        link: `${siteUrl}/article?id=${post.id}`,
        description: post.title,
        content: post.content,
        author: [
          {
            name: '2binfront',
            email: '2binfront@gmail.com',
            link: 'https://2binfront.com',
          },
        ],
        date: new Date(post.create_date),
        image: undefined,
      });
    });

    // 添加分类（如果有）
    const categories = await this.prisma.category.findMany();
    categories.forEach((category) => {
      feed.addCategory(category.name);
    });

    // 返回RSS格式
    return feed.rss2();
  }
}
