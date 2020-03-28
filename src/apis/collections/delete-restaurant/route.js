const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'DELETE',
  path: '/collections/{id}/restaurants/{restaurantId}',
  handler: handler.deleteRestaurant,
  options: {
    tags: ['api', 'collections', 'delete', 'delete-restaurant'],
    description: 'Delete restaurant from collection',
    notes: 'Delete restaurant from collection',
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
