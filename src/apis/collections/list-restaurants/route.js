const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/collections/{id}/restaurants',
  handler: handler.listRestaurants,
  options: {
    tags: ['api', 'collections', 'list'],
    description: 'List restaurant on a collection',
    notes: 'List restaurant on a collection',
    validate: {
      params: schemas.paramsSchema,
      headers: schemas.headerSchema,
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
