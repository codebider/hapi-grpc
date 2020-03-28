const isNonEmptyString = require('../conditional/isNonEmptyString');
const makeThrowable = require('./makeThrowable');

/**
 * Throw if a value is an empty String
 *
 * @param {*} value to pass the assertion
 * @param {string} errorMessage
 * @param {Error} [Error=TypeError]
 * @throws {TypeError}
 * @returns {void}
 */
module.exports = makeThrowable(isNonEmptyString, 'Non-empty String');
