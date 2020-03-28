const omitBy = require('lodash/omitBy');
const isMissing = require('../conditional/isMissing');

/**
 * Remove all properties of an object that is considered
 * to be missing ("undefined" or "null")
 *
 * @param {Object} object
 * @returns {Object}
 */
module.exports = object => omitBy(object, isMissing);
