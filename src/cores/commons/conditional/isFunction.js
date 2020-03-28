const is = require('is_js');

/**
 * Find out whether value is of type Function
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is of type Function, else false
 */
module.exports = value => is.function(value);
