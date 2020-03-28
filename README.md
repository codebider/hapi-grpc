# Installation
- Install Nodejs version >= 10.13
- Install npm
- Install Docker

# Development
### Setup data 

- Run start docker-compose to run db for development
`docker-compose up -d`

- Migrate database `npm run sequelize-cli db:migrate`

### Install modules
- `npm install`

### Start server 
- `npm run develop`

