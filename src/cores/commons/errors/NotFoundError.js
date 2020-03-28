const BaseError = require('./BaseError');

const defaultMessage = 'Not Found';
const defaultCode = 'NOT_FOUND';
const defaultName = 'Not Found';
const defaultStatus = 404;

/**
 * NotFoundError
 *
 * Is thrown if the resource could not be found
 * This is often used as a catch-all for all invalid URIs requested of the server
 * This will lead to an HTTP 404 Not Found
 *
 * @class NotFoundError
 * @extends {BaseError}
 */
module.exports = class NotFoundError extends BaseError {
  /**
   * Create an instance of NotFoundError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof NotFoundError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
};
