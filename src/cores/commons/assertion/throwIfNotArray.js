const isArray = require('../conditional/isArray');

const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is not of type Array
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(isArray, 'Array');
