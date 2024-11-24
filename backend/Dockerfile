FROM node:20-alpine AS build
WORKDIR /app
RUN addgroup -S app && adduser -S -G app app
COPY package*.json prisma/ ./ 
RUN npm ci
COPY . ./
RUN chmod +x ./docker-entrypoint.sh
RUN npm run build \
    npx prisma generate

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Brazil/East /etc/localtime && \
    apk del tzdata && \
    touch dist/log.txt && \
    chown app dist/log.txt
USER app
EXPOSE 8080