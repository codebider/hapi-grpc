const BaseError = require('./BaseError');

const defaultMessage = 'Forbidden';
const defaultCode = 'FORBIDDEN';
const defaultName = 'Forbidden';
const defaultStatus = 403;

/**
 * ForbiddenError
 *
 * Is thrown if the request was formatted correctly but the server is refusing to supply the requested resource
 * Unlike 401, authenticating will not make a difference in the server's response
 * This will lead to an HTTP 403 (Forbidden) status code
 *
 * @class
 * @extends BaseError
 */
class ForbiddenError extends BaseError {
  /**
   * Create an instance of ForbiddenError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof ForbiddenError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
}

module.exports = ForbiddenError;
