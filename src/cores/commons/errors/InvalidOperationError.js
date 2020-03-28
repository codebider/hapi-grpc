const BaseError = require('./BaseError');

const defaultMessage = 'Invalid Operation';
const defaultCode = 'INVALID_OPERATION';
const defaultName = 'Invalid Operation';
const defaultStatus = 500;

/**
 * InvalidOperationError
 *
 * Is thrown if the request attempts to perform an invalid operation
 * This will lead to an HTTP 500 Internal Server Error
 *
 * @class
 * @extends BaseError
 */
module.exports = class InvalidOperationError extends BaseError {
  /**
   * Create an instance of InvalidOperationError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof InvalidOperationError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
};
