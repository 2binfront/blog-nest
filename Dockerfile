# 使用 Node.js 官方镜像作为基础镜像
FROM node:20.18.1  AS base

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.0.6 --activate

COPY . /app
WORKDIR /app

ENV NODE_ENV production
# 构建环境依赖
FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN  pnpm install --frozen-lockfile
RUN pnpm run build


#Set shell to sh
#SHELL ["/bin/sh", "-c"]
# Ensure the pnpm global bin directory is set up
#RUN pnpm setup

# Set the global bin directory to the PATH
#ENV PNPM_HOME="/root/.local/share/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"
# 准备生产环境，剥离 devDependencies
RUN pnpm prune --prod

#

# 暴露应用程序端口
EXPOSE 3001


# 启动应用程序

CMD ["pnpm","start:prod"]
