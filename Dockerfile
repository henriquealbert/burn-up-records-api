FROM node:16-alpine

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start:dev"]
