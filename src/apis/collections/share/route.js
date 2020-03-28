const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'POST',
  path: '/collections/{id}/share',
  handler,
  options: {
    tags: ['api', 'collections', 'share'],
    description: 'Share one collections',
    notes: 'Share one collections',
    validate: {
      headers: schemas.headerSchema,
      params: schemas.paramsSchema,
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
