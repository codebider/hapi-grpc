const Hapi = require('@hapi/hapi');
const defaultTo = require('lodash/defaultTo');

const config = require('./cores/config');

const requestContext = require('./plugins/plugin-request-context');
const pluginError = require('./plugins/plugin-error');
const pluginSwagger = require('./plugins/plugin-swagger');
const containers = require('./cores/registerContainers');

const logger = require('./cores/commons/logger');

const apis = require('./apis');

const plugins = [
  {
    plugin: requestContext,
    options: {
      config,
      containers,
    },
  },
  {
    plugin: pluginError,
    options: {
      logger,
    },
  },
  {
    plugin: pluginSwagger,
    options: {
      logger,
      config: config.get('swagger'),
    },
  },
];

const failAction = async (request, h, err) => {
  throw err;
};

module.exports = async (options = {}) => {
  const host = defaultTo(options.host, config.get('host'));
  const port = defaultTo(options.port, config.get('port'));
  const routes = {
    cors: true,
    validate: {
      failAction,
    },
  };

  const server = Hapi.server({ host, port, routes });
  await server.register(plugins);

  server.route(apis);

  return server;
};
