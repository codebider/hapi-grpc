const InvalidOperationError = require('../../../cores/commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../cores/commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/collections/{id}',
  handler,
  options: {
    tags: ['api', 'collections', 'get'],
    description: 'Get one collections',
    notes: 'Get one collections',
    validate: {
      headers: schemas.headerSchema,
      params: schemas.paramsSchema,
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
