const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'PUT',
  path: '/collections/{id}',
  handler: handler.update,
  options: {
    tags: ['api', 'collections', 'create'],
    description: 'Update collection',
    notes: 'Update collection',
    validate: {
      params: schemas.paramsSchema,
      payload: schemas.payloadSchema,
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
