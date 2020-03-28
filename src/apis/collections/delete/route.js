const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'DELETE',
  path: '/collections/{id}',
  handler: handler.deleteCollection,
  options: {
    tags: ['api', 'collections', 'delete'],
    description: 'Delete collection',
    notes: 'Delete collection',
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
