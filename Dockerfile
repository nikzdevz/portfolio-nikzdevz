# ===========================================
# nikzdevz Portfolio - Frontend-only Dockerfile
# ===========================================
# Multi-stage build for the frontend-only deployment.
# Stage 1 builds the React/Vite app from ./frontend; stage 2 serves it via Nginx.

FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --only=production && npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
LABEL maintainer="nikzdevz"
LABEL description="nikzdevz Portfolio - frontend-only"
LABEL version="1.0.0"
RUN apk add --no-cache curl
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
RUN addgroup -g 1001 -S nginxgroup && \
    adduser -u 1001 -S nginxuser -G nginxgroup && \
    chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/conf.d
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1
USER nginxuser
CMD ["nginx", "-g", "daemon off;"]
