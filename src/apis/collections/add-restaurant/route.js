const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'POST',
  path: '/collections/{id}/restaurants/{restaurantId}',
  handler: handler.addRestaurant,
  options: {
    tags: ['api', 'collections', 'create'],
    description: 'Add restaurant to collection',
    notes: 'Add restaurant to collection',
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
