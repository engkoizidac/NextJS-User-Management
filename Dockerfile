# 1. Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and generate Prisma client
COPY . .
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# 2. Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.local .env

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]