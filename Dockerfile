# 使用 Node.js 官方镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

ENV NODE_ENV production
# 安装项目依赖
RUN npm i -g pnpm

#Set shell to sh
#SHELL ["/bin/sh", "-c"]
# Ensure the pnpm global bin directory is set up
#RUN pnpm setup

# Set the global bin directory to the PATH
#ENV PNPM_HOME="/root/.local/share/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g @nestjs/cli

# 安装项目依赖
RUN pnpm i

RUN pnpm i express

# 复制项目文件
COPY . .

# 编译 TypeScript 代码
RUN npm run build

# 暴露应用程序端口
EXPOSE 3001

# 启动应用程序
CMD ["npm","run","start:prod"]
