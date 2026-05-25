# ===========================================
# Frontend - Production Dockerfile
# ===========================================
# Multi-stage build for optimized production image
# Stage 1: Build
# Stage 2: Production runtime

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM nginx:alpine

# Add labels for better container management
LABEL maintainer="nikzdevz"
LABEL description="nikzdevz Portfolio - Frontend React Application"
LABEL version="1.0.0"

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user for security
RUN addgroup -g 1001 -S nginxgroup && \
    adduser -u 1001 -S nginxuser -G nginxgroup && \
    chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/conf.d

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Set user
USER nginxuser

# Start nginx
CMD ["nginx", "-g", "daemon off;"]