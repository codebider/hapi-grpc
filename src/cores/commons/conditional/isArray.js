const is = require('is_js');

/**
 * Find out whether value is of type Array
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is of type Array, else false
 */
module.exports = value => is.array(value);
