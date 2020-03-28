const BaseError = require('./BaseError');

const defaultMessage = 'Bad User Input';
const defaultCode = 'BAD_USER_INPUT';
const defaultName = 'Bad User Input';
const defaultStatus = 400;

/**
 * BadUserInputError
 *
 * Is thrown if the request could not be fulfilled due to the incorrect syntax of the request
 * This will lead to an HTTP 400 (Bad Request) status code
 *
 * @class
 * @extends BaseError
 */
class BadUserInputError extends BaseError {
  /**
   * Create an instance of BadUserInputError
   *
   * @param {string} [message] - the error message
   * @param {string} [code] - the error code
   * @param {*} [data] - the error object and/or additional data
   * @memberof BadUserInputError
   */
  constructor(message = defaultMessage, code = defaultCode, data) {
    // Create the error using our Base Error and the appropriate http status code
    super(message, code, defaultName, defaultStatus, data);
  }
}

module.exports = BadUserInputError;
