const BaseError = require('./BaseError');

const defaultMessage = 'Unauthorized';
const defaultCode = 'UNAUTHORIZED';
const defaultName = 'Unauthorized';
const defaultStatus = 401;

/**
 * UnauthorizedError
 *
 * Is thrown if the requester is not authorized to access the resource
 * This is similar to 403 but is used in cases where authentication is expected but has failed or has not been provided
 * This will lead to an HTTP 401 (Unauthorized) status code
 *
 * @class
 * @extends BaseError
 */
class UnauthorizedError extends BaseError {
  /**
   * Create an instance of UnauthorizedError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof UnauthorizedError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
}

module.exports = UnauthorizedError;
