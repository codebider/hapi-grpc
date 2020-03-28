const get = require('lodash/get');
const isPresent = require('../conditional/isPresent');

/**
 * Function to pick get property value from input object by list modal details
 *
 * @param {Object} object
 * @param {Array} mapModalDetails
 * @param {Object} specialMapping
 * @param {Object} defaultMapping
 * @returns {Object}
 */
const mapper = (object, mapModalDetails, specialMapping = {}, defaultMapping = {}) => {
  const returnObject = {};

  mapModalDetails.forEach(property => {
    const specialVal = get(object, specialMapping[[property]]);
    const defaultVal = get(defaultMapping, property);

    returnObject[property] = isPresent(specialVal)
      ? specialVal
      : get(object, property, defaultVal);
  });

  return returnObject;
};

module.exports = mapper;
