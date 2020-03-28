const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/restaurants',
  handler: handler.list,
  options: {
    tags: ['api', 'restaurants', 'list'],
    description: 'List restaurants',
    notes: 'List restaurants',
    validate: {
      query: schemas.querySchema,
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
