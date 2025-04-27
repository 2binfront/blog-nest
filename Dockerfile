# 基础阶段：设置 Node.js 环境
FROM node:20.18.1 AS base
WORKDIR /app

# 设置 pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.0.6 --activate

# 构建阶段：安装依赖并构建应用
FROM base AS build
WORKDIR /app

# 先只复制包管理文件以利用缓存
COPY package.json pnpm-lock.yaml* ./
# 使用缓存安装依赖
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 复制源代码并构建
COPY . .
RUN pnpm run build

# 生产阶段：准备最小化的生产镜像
FROM base AS production
WORKDIR /app

# 设置生产环境
ENV NODE_ENV=production

# 复制 package.json 和 lock 文件
COPY package.json pnpm-lock.yaml* ./
# 复制构建产物
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# 可选：如果你想进一步优化，可以只安装生产依赖
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

EXPOSE 3001
CMD ["pnpm", "start:prod"]
