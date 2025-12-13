# ---------- Build Stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /usr/src/app
  
  # Copy only package files
  COPY package*.json ./
  
  # Install dependencies (includes devDependencies)
  RUN npm ci
  
  # Copy all source code
  COPY . .
  
  # Build the NestJS app
  RUN npm run build
  
  # ---------- Production Stage ----------
  FROM node:20-alpine AS production
  
  WORKDIR /usr/src/app
  
  # Copy only production deps from build stage
  COPY --from=builder /usr/src/app/node_modules ./node_modules
  
  # Copy built dist + package.json (optional)
  COPY --from=builder /usr/src/app/dist ./dist
  COPY --from=builder /usr/src/app/package*.json ./
  
  # Create non-root user
  RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
  USER nestjs
  
  # Expose app port
  EXPOSE 4000
  
  # Healthcheck
  HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node dist/main.js || exit 1
  
  # Start app
  CMD ["node", "dist/main.js"]  