const isMissing = require('./isMissing');

/**
 * Find out whether value is not undefined and not null, therefore "present"
 *
 * @param {*} value to be validated
 * @returns {boolean} true if value is not undefined and not null, else false
 */
module.exports = value => !isMissing(value);
