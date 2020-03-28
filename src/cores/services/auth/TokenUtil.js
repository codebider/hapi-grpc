const pick = require('lodash/pick');
const jwt = require('jsonwebtoken');

const throwIfMissing = require('../../commons/assertion/throwIfMissing');

const REQUIRED_OPTIONS = ['logger', 'secretKey'];
/**
 * JwtUtil
 *
 */
class TokenUtil {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
  }

  /**
   * Generate the token
   *
   * @param {Object} obj
   * @returns {string} - token
   */
  sign(obj) {
    return jwt.sign(obj, this.secretKey, { expiresIn: '30d' });
  }

  /**
   * Verify the token with secretKey
   *
   * @param {string} token
   * @returns {boolean}
   */
  verify(token) {
    return jwt.verify(token, this.secretKey);
  }
}

module.exports = TokenUtil;
