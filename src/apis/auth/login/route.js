const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'POST',
  path: '/auth/login',
  handler: handler.login,
  options: {
    tags: ['api', 'auth', 'login'],
    description: 'Login by username and password',
    notes: 'Login by username and password',
    validate: {
      payload: schemas.payloadSchema,
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'OK', schema: schemas.responseSchema },
          ...createErrorResponses(new InvalidOperationError()),
        },
      },
    },
  },
};

module.exports = route;
