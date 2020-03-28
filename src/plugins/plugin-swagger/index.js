// Hapi Swagger: https://github.com/glennjones/hapi-swagger
// A Swagger interface for HAPI

const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const throwIfMissing = require('../../cores/commons/assertion/throwIfMissing');

const register = async (server, options) => {
  throwIfMissing(options.config, 'options.config is required');
  throwIfMissing(options.logger, 'options.logger is required');
  const { config, logger } = options;

  throwIfMissing(config.title, 'config.title is required');
  throwIfMissing(config.version, 'config.version is required');
  throwIfMissing(config.path, 'config.path is required');
  const { title, version, path } = config;

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title,
          version,
        },
        documentationPath: path,
      },
    },
  ]);

  const { protocol, host, port } = server.info;
  const url = new URL(path, `${protocol}://${host}:${port}`);
  logger.info(`API documentation is created at: ${url}`);
};

module.exports = {
  name: 'swagger',
  version: '0.0.1',
  register,
};
