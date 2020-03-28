const isArray = require('./isArray');

/**
 * Find out whether value is of type Array, and has at least one element
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is of type Array and has at least one element, else false
 */
module.exports = value => isArray(value) && value.length > 0;
