const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'POST',
  path: '/auth/register',
  handler: handler.register,
  options: {
    tags: ['api', 'auth', 'register'],
    description: 'Register account',
    notes: 'Register account',
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
