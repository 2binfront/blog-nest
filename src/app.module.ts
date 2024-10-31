import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import * as WinstonMongodb from 'winston-mongodb';
import * as winston from 'winston';
@Module({
  imports: [
    WinstonModule.forRoot({
      // options
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: 'verbose',
          format: winston.format.combine(winston.format.timestamp()),
        }),
        //   保存到数据库
        new WinstonMongodb.MongoDB({
          level: process.env.WINSTON_LOGGER_LEVEL_MONGO || 'verbose',
          db: `mongodb://${process.env.MONGO_HOST || '127.0.0.1'}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_WINSTON || 'app-log'}`,
          options: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        // // 输出文件
        new winston.transports.File({
          //定义输出日志文件
          filename: 'logFile/combined.log',
          level: 'http',
        }),
        // new winston.transports.File({
        //   filename: 'logFile/errors.log',
        //   level: 'error',
        // }),
        // new winston.transports.File({
        //   filename: 'logFile/warning.log',
        //   level: 'warning',
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): any => ({
        uri: `mongodb://${configService.get<string>('MONGO_HOST')}:${configService.get<string>('MONGO_PORT')}/${configService.get<string>('MONGO_DATABASE')}`,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ArticleModule,
    UsersModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
