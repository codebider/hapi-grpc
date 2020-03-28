const pick = require('lodash/pick');

const throwIfMissing = require('../../commons/assertion/throwIfMissing');
const isMissing = require('../../commons/conditional/isMissing');
const hashPwd = require('../../commons/utils/hashPwd');

const BadUserInputError = require('../../commons/errors/BadUserInputError');

const { ERROR_MESSAGES } = require('./constants');

const REQUIRED_OPTIONS = ['logger', 'tokenUtil', 'userDao'];

/**
 * AuthService
 * This is authentication service
 */
class AuthService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
  }

  /**
   * Login with username and password
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<Object>} - user's info and token
   */
  async login(username, password) {
    const user = await this.userDao.findOne({ username });
    if (isMissing(user)) {
      throw new BadUserInputError(ERROR_MESSAGES.WRONG_USERNAME_PASSWORD);
    }

    // Check password is correct or not
    const { hashPassword } = user;
    const isMatch = await hashPwd.compare(password, hashPassword);
    if (!isMatch) {
      throw new BadUserInputError(ERROR_MESSAGES.WRONG_USERNAME_PASSWORD);
    }

    const { fullName, id } = user;

    const token = this.tokenUtil.sign({ id });

    return {
      id,
      fullName,
      token,
    };
  }

  /**
   * Register account
   *
   * @param {Object} payload
   * @returns {Promise}
   */
  async register(payload) {
    const { fullName, username, password } = payload;

    // Check existed user
    const user = await this.userDao.findOne({ username });
    if (!isMissing(user)) {
      throw new BadUserInputError(ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTED);
    }

    const hashPassword = await hashPwd.hash(password);

    // Create account for this user
    await this.userDao.create({ fullName, username, hashPassword });
  }

  async verify(token) {
    const { id } = this.tokenUtil.verify(token);
    // TODO: cache user info
    const user = await this.userDao.findById(id);

    delete user.hashPassword;

    return user;
  }
}

module.exports = AuthService;
