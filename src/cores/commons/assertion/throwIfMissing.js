const isPresent = require('../conditional/isPresent');
const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is missing (it's null or undefined)
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(isPresent, 'Something');
