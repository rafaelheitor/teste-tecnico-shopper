FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./ 
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN addgroup -S app && adduser -S -G app app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Brazil/East /etc/localtime && \
    apk del tzdata && \
    touch dist/log.txt && \
    chown app dist/log.txt
USER app
EXPOSE 8080
CMD ["node", "dist/main"]