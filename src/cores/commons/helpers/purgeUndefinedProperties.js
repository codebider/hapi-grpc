const omitBy = require('lodash/omitBy');
const isUndefined = require('lodash/isUndefined');

/**
 * Remove all properties of an object that is "undefined"
 *
 * @param {Object} object
 * @returns {Object}
 */
module.exports = object => omitBy(object, isUndefined);
