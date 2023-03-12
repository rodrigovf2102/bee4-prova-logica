FROM node:14-alpine
WORKDIR /usr/src
COPY package.json .
RUN npm i
COPY . .