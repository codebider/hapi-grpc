// Boom: https://github.com/hapijs/boom
// HTTP-friendly error objects

const get = require('lodash/get');

const BaseError = require('./BaseError');

const defaultCode = 'BOOM_ERROR';

/**
 * BoomError
 *
 * @class
 * @extends BaseError
 */
module.exports = class BoomError extends BaseError {
  /**
   * Create an instance of BoomError
   *
   * @param {Object} object - the Boom object instance
   * @memberof BoomError
   */
  constructor(object) {
    const message = get(object, ['output', 'payload', 'message']);
    const name = get(object, ['output', 'payload', 'error']);
    const status = get(object, ['output', 'payload', 'statusCode']);
    const data = get(object, ['data']);

    // Create the error using our Base Error
    super(message, defaultCode, name, status, data);
  }
};
