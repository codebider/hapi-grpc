const is = require('is_js');

/**
 * Find out whether value is undefined or null, therefore "missing"
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is undefined or null, else false
 */
module.exports = value => is.undefined(value) || is.null(value);
