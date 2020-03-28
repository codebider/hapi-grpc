const is = require('is_js');

/**
 * Find out whether value is of type String, and has at least one character
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is of type String and has at least one character, else false
 */
module.exports = value => is.string(value) && value.length > 0;
