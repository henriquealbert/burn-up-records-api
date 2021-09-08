# Burn Up Records API

#### 🚧  API 🚀 work in progress...  🚧

### ✨ Features

##### Core
- [x] Users table
- [x] Authentication
- [x] Roles permissions
- [x] File uploads

##### Business
- [x] Releases table
- [x] Tracks table
- [ ] Emails
- [ ] Statments table
- [ ] Web Scrapping

##### Deploy
- [ ] SSL + Proxy (Docker compose)

### 🎲 Requirements
- Docker
- Docker compose
- Git

### 🚀 Instalation
```bash
# Clone this repo
$ git clone https://github.com/henriquealbert/burn-up-records-api

# Go to the folder
$ cd burn-up-records-api

# Create .env file
$ cp .env.example .env

# Run docker compose
$ docker-compose up

# The server will start on port 3333 - visit <http://localhost:3333/graphql> to play with the GraphQL Playground
```

### 🛠 Techs
- NestJS
- TypeORM
- GraphQL
- PostgreSQL
- TypeScript
- Node.js
- Apollo Server
- Jest
- Passaport
- JWT
