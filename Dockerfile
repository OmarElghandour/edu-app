# Dockerfile

FROM node:16.15-alpine3.14
WORKDIR /app
EXPOSE 5000
COPY package.json package-lock*.json ./

RUN npm install && npm update

COPY . . 
