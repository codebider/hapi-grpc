const ExtendableError = require('es6-error');

const throwIfNotNumber = require('../assertion/throwIfNotNumber');
const throwIfNotString = require('../assertion/throwIfNotString');

const isPresent = require('../conditional/isPresent');

/**
 * BaseError
 *
 * The base class for all errors which will get special treatment in the Hapi.js pipeline
 *
 * @class
 * @extends ExtendableError
 */
module.exports = class BaseError extends ExtendableError {
  /**
   * Create an instance of BaseError
   *
   * @param {string} message - the error message
   * @param {string} code - the error code
   * @param {string} name - the error name
   * @param {number} status - the http status code
   * @param {*} [data] - the error object and/or additional data
   * @memberof BaseError
   */
  constructor(message, code, name, status, data) {
    throwIfNotString(message);
    throwIfNotString(code);
    throwIfNotString(name);
    throwIfNotNumber(status);

    super(message);
    this.code = code;
    this.name = name;
    this.status = status;
    this.data = data;

    // This field is used to allow internal services to determine
    // whether the error object is an instance of Base Error (a bit like 'isBoom')
    this.isBaseError = true;
  }

  // Render the error message for response to the user
  render() {
    const { status, name, code, message } = this;
    const error = { status, name, code, message };
    const data = isPresent(this.data) ? this.data : null;

    return {
      body: { error, data },
      code: status,
      message: name,
    };
  }
};
