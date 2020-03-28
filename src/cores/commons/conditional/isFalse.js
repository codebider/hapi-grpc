const is = require('is_js');

/**
 * Find out whether value is of type Boolean and is false
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is of type Boolean and is false, else false
 */
module.exports = value => is.boolean(value) && value === false;
