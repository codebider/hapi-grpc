/**
 * This plugin will inject the dependencies into the ctx object
 *
 * @param {Object} server - server information
 * @param {Object} options - the configuration for this plugin
 *
 * @returns {Object} - next chain
 */
const register = async (server, options) => {
  const {
    containers: { registerContainer, init, stop },
  } = options;

  await init(server);

  // Default request context
  const ctx = {};

  server.ext('onRequest', (request, h) => {
    const requestContext = { ...ctx, scope: registerContainer(request) };

    Object.assign(request, {
      ctx: requestContext,
      getContainer: name => {
        if (request.ctx.scope.has(name)) {
          return request.ctx.scope.resolve(name);
        }
        throw new Error(`The request service [${name}] is not found`);
      },
    });

    // Return the signal for next chain
    return h.continue;
  });

  server.ext('onPostStop', async () => {
    await stop();
  });
};

module.exports = {
  name: 'request-context',
  register,
};
