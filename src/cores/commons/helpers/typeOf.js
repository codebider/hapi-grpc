const get = require('lodash/get');
const kindOf = require('kind-of');

const isPresent = require('../conditional/isPresent');

/**
 * Get the type of a value
 *
 * @param {*} value
 * @returns {string}
 */
module.exports = value => {
  const className = get(value, ['constructor', 'name']);
  return isPresent(className) ? className : kindOf(value);
};
