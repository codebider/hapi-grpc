const isTrue = require('../../cores/commons/conditional/isTrue');

const BoomError = require('../../cores/commons/errors/BoomError');

const register = async (server, options) => {
  const { logger } = options;

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // With the expected controllable error
    if (isTrue(response.isBaseError)) {
      const { body, code, message } = response.render();

      return h
        .response(body)
        .code(code)
        .message(message);
    }

    // The server has encountered an error or is incapable of performing the request
    // Indicate status code >= 500
    // @see https://github.com/hapijs/boom#boom
    if (isTrue(response.isServer)) {
      logger.error(response.stack);
    }

    // Check if is a Boom object instance
    // @see https://github.com/hapijs/boom#boom
    if (isTrue(response.isBoom)) {
      const error = new BoomError(response);
      const { body, code, message } = error.render();

      return h
        .response(body)
        .code(code)
        .message(message);
    }

    return h.continue;
  });
};

module.exports = {
  name: 'error',
  version: '0.0.1',
  register,
};
