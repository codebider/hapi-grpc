const isNonEmptyString = require('../conditional/isNonEmptyString');
const isTrue = require('../conditional/isTrue');
const noop = require('../helpers/noop');
const toString = require('../helpers/toString');
const typeOf = require('../helpers/typeOf');

/**
 * @param {Function} conditional
 * @param {string} expectedType – expected type, in case of Error
 * @throws {Error}
 * @returns {Function}
 */
module.exports = (conditional = noop, expectedType) => (
  value,
  errorMessage,
  Error = TypeError,
) => {
  if (!isNonEmptyString(expectedType)) {
    throw new TypeError('"expectedType" has to be a non-empty string');
  }

  const valid = conditional(value);
  const message = isNonEmptyString(errorMessage)
    ? errorMessage
    : `Error – expected "${expectedType}", instead got "${toString(value)}: ${typeOf(value)}"`;

  if (!isTrue(valid)) {
    throw new Error(message);
  }
};
