FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]
