const is = require('is_js');
const stringify = require('json-stringify-safe');

const noop = require('./noop');
const typeOf = require('./typeOf');

/**
 * @param {*} value
 * @returns {string}
 */
module.exports = value => {
  if (value === noop) {
    return 'noop';
  }

  if (is.function(value)) {
    return 'function';
  }

  if (is.undefined(value)) {
    return 'undefined';
  }

  if (is.nan(value)) {
    return 'nan';
  }

  if (is.infinite(value)) {
    return 'infinity';
  }

  if (is.string(value)) {
    return value;
  }

  if (typeOf(value) === 'Buffer') {
    return value.toString('base64');
  }

  return stringify(value);
};
