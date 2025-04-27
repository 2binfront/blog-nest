import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './modules/article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { TagController } from './modules/tag/tag.controller';
import { TagService } from './modules/tag/tag.service';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import * as WinstonMongodb from 'winston-mongodb';
import * as winston from 'winston';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import { PrismaModule } from './common/prisma/prisma.module';
import { RouterModule } from '@nestjs/core';
import { RssModule } from './modules/rss/rss.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client/dist'),
    }),
    WinstonModule.forRoot({
      // options
      levels: {
        error: 0,
        warn: 1,
        http: 2,
        debug: 3,
        info: 4,
        verbose: 5,
        silly: 6,
      },
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
              colors: {
                error: 'red',
                warn: 'yellow',
                http: 'green',
                info: 'white',
                verbose: 'cyan',
                debug: 'blue',
                silly: 'magenta',
              },
            }),
            winston.format.timestamp(),
          ),
        }),
        // 输出到文件
        new winston.transports.File({
          filename: 'logFile/combined.log',
          level: 'silly',
        }),
        // 太多了浪费空间影响性能，有一个combined够用了
        // new winston.transports.File({
        //   filename: 'logFile/http.log',
        //   level: 'http',
        //   format: winston.format((info) => (info.level === 'http' ? info : false))(),
        // }),
        // new winston.transports.File({
        //   filename: 'logFile/warning.log',
        //   level: 'warn',
        //   format: winston.format((info) => (info.level === 'warn' ? info : false))(),
        // }),
        // new winston.transports.File({
        //   filename: 'logFile/errors.log',
        //   level: 'error',
        //   format: winston.format((info) => (info.level === 'error' ? info : false))(),
        // }),
      ],
      // 未捕获的异常
      exceptionHandlers: [new winston.transports.File({ filename: 'logFile/exceptions.log' })],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService): any => ({
    //     type: 'postgres',
    //     host: configService.get<string>('POSTGRES_HOST'),
    //     port: configService.get<string>('POSTGRES_PORT'),
    //     username: configService.get<string>('POSTGRES_USER'),
    //     password: configService.get<string>('POSTGRES_PASSWORD'),
    //     database: configService.get<string>('POSTGRES_DATABASE'),
    //     entities: ['**/*.entity{.ts,.js}'],
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService): any => ({
    //     uri: `mongodb://${configService.get<string>('MONGO_HOST')}:${configService.get<string>('MONGO_PORT')}/${configService.get<string>('MONGO_DATABASE')}`,
    //   }),
    //   inject: [ConfigService],
    // }),
    RouterModule.register([
      {
        path: 'api/blog',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'tag',
            module: TagModule,
          },
          {
            path: 'category',
            module: CategoryModule,
          },
          {
            path: 'article',
            module: ArticleModule,
          },
        ],
      },
      {
        path: 'api',
        module: RssModule,
      },
    ]),
    AuthModule,
    ArticleModule,
    UsersModule,
    TagModule,
    CategoryModule,
    RssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
