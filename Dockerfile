# 1. Base image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install

# 4. Copy rest of the app
COPY . .

# 5. Generate Prisma client
RUN npx prisma generate

# 6. Build Next.js app
RUN npm run build

# 7. Expose the port
EXPOSE 3000

# 8. Run the app
CMD ["npm", "start"]
