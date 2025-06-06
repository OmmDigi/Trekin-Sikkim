# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "build-start" ]

# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the source code
COPY . .

# Build the Next.js project
RUN npm run build

# ---- Stage 2: Production Runtime ----
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies (optional if needed)
COPY package*.json ./
RUN npm install --production --force

# Copy built project from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

# Expose app port
EXPOSE 3000

# Start app (make sure `build-start` = "next start" in package.json)
CMD ["npm", "run", "start"]
