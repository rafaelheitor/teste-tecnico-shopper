FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
ENV NEXT_PUBLIC_GOOGLE_API_KEY=${GOOGLE_API_KEY}
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]
