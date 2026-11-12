# 构建阶段：只在镜像构建时用 Node，运行时不再保留
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段：nginx 提供 .vitepress/dist 静态文件
FROM nginx:stable-alpine
RUN sed -i 's/worker_processes .*/worker_processes 1;/' /etc/nginx/nginx.conf \
    && rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
