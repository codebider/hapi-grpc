const isNonEmptyArray = require('../conditional/isNonEmptyArray');
const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is an empty Array
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(isNonEmptyArray, 'Non-empty Array');
