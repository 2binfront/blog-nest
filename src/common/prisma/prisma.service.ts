import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { DynamicClientExtensionThis } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: `${configService.get<string>('database.type')}://${configService.get<string>('database.user')}:${configService.get<string>('database.pwd')}@${configService.get<string>('database.host')}:${configService.get<string>('database.port')}/${configService.get<string>('database.db')}?connection_limit=100`,
        },
      },
      log: ['info'],
    });

    // // 添加扩展，计算属性、中间件
    // const extendedClient = this.$extends({
    //   name: 'commodity_realCost',
    //   result: {
    //     cp_commodity: {
    //       discount_cost: {
    //         needs: { discount: true, cost: true },
    //         compute({ discount, cost }) {
    //           return discount * cost || 0;
    //         },
    //       },
    //     },
    //   },
    // })
    //   .$extends({
    //     name: 'mobile_image',
    //     result: {
    //       cp_image: {
    //         mobile_image: {
    //           needs: { origin_url: true },
    //           compute({ origin_url }) {
    //             return `${configService.get('DOMAIN')}/${origin_url}?imageMogr2/auto-orient`;
    //           },
    //         },
    //       },
    //     },
    //   })
    //   .$extends({
    //     name: 'forum_article_expiring_date',
    //     result: {
    //       cp_forum_article: {
    //         expiring_date: {
    //           needs: { expiring_day: true, publish_date: true },
    //           compute({ expiring_day, publish_date }) {
    //             return new Date(new Date(publish_date).getTime() + expiring_day * 24 * 60 * 60 * 1000);
    //           },
    //         },
    //       },
    //     },
    //   });

    // Object.assign(this, extendedClient);
  }

  // 仅应用创建时调用一次
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.log(e);
    }
  }

  // 应用销毁时断开连接
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
