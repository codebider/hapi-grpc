const isTrue = require('../conditional/isTrue');

const BaseError = require('./BaseError');

/**
 * Create the error responses that are displayable in Swagger interface
 *
 * @see https://github.com/glennjones/hapi-swagger/blob/master/usageguide.md#response-object
 *
 * @param {...Object} errors
 * @returns {Object}
 */
module.exports = (...errors) =>
  errors
    .filter(error => error instanceof BaseError && isTrue(error.isBaseError))
    .reduce(
      (accumulator, error) => ({
        ...accumulator,
        [error.status]: {
          description: error.name,
        },
      }),
      {},
    );
