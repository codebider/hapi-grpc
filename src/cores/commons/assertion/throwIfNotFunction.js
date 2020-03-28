const isFunction = require('../conditional/isFunction');

const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is not of type Function
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(isFunction, 'Function');
