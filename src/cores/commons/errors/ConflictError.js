const BaseError = require('./BaseError');

const defaultMessage = 'Conflict';
const defaultCode = 'CONFLICT';
const defaultName = 'Conflict';
const defaultStatus = 409;

/**
 * ConflictError
 *
 * Is thrown if the request cannot be completed due to a conflict in the request parameters
 * This will lead to an HTTP 409 (Conflict) status code
 *
 * @class
 * @extends BaseError
 */
class ConflictError extends BaseError {
  /**
   * Create an instance of ConflictError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof ConflictError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
}

module.exports = ConflictError;
