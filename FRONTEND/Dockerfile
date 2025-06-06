# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "build-start" ]

# Builder Stage
FROM node:18 AS builder
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Production Stage
FROM node:18-alpine AS frontend

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

RUN npm install --production

CMD ["npm", "run", "start"]

