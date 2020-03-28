const { createContainer, asFunction, asValue } = require('awilix');
const config = require('./config');
const logger = require('./commons/logger');
const db = require('./db/models');
const userDao = require('./services/daos/users');
const restaurantDao = require('./services/daos/restaurants');
const collectionDao = require('./services/daos/collections');

const authService = require('./services/auth');
const restaurantService = require('./services/restaurants');
const collectionService = require('./services/collections');
const socket = require('./services/socket');
// Main container for whole application.
const container = createContainer();

// Application scope
container.register({
  config: asValue(config),
  logger: asValue(logger),

  // DB
  db: asValue(db),
  userDao: asFunction(userDao).singleton(),
  restaurantDao: asFunction(restaurantDao).singleton(),
  collectionDao: asFunction(collectionDao).singleton(),

  // Services
  authService: asFunction(authService).singleton(),
  restaurantService: asFunction(restaurantService).singleton(),
  collectionService: asFunction(collectionService).singleton(),

  // Socket
  socketIO: asFunction(socket).singleton(),
});

const registerContainer = () => {
  const requestScope = container.createScope();
  // services
  requestScope.register({
    // register for scope
  });

  return requestScope;
};

const init = async server => {
  const socketIO = container.resolve('socketIO');
  socketIO.init(server);
  await db.sequelize.authenticate();
  logger.log('Connection has been established successfully.');
};

const stop = async () => {
  logger.log('Try to closed Connection');
  await db.sequelize.close();
  logger.log('Closed connection successfully.');
};

module.exports = {
  registerContainer,
  init,
  stop,
};
