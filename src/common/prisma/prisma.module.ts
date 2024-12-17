import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 注册到全局，避免到处导入
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
