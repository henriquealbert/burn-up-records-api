FROM node:16-alpine

WORKDIR /usr/app

RUN npm install -g @nestjs/cli

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]
