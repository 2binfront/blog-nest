# 使用 Node.js 官方镜像作为基础镜像
FROM node:20.18.1 AS base

# 设置工作目录
WORKDIR /app

ENV DATABASE_URL="postgresql://postgres:123456@localhost:5432/app?schema=public"
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DATABASE=app
ENV JWT_SECRET=123456
ENV PASSWORD=123456


# 设置 PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.0.6 --activate

# 构建阶段
FROM base AS build
WORKDIR /app

# 先复制 package.json 和 lockfile 以利用缓存
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 复制源代码（可以使用 .dockerignore 排除不需要的文件）
COPY . .


RUN pnpx prisma generate

# 构建应用
RUN pnpm run build

# 生产阶段
FROM base AS production
WORKDIR /app

# 设置生产环境
ENV NODE_ENV production

# 复制 package.json 和 lockfile
COPY package*.json pnpm-lock.yaml* ./

# 明确复制环境文件（如果需要）
COPY .env* ./

# 复制构建后的文件和依赖
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# 暴露应用程序端口
EXPOSE 3001

# 启动应用程序
CMD ["pnpm", "start:prod"]
