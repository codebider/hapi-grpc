const is = require('is_js');
const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is not of type Number
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(is.number, 'Number');
