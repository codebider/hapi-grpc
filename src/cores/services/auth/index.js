const AuthService = require('./AuthService');
const TokenUtil = require('./TokenUtil');

module.exports = ({ logger, userDao, config }) => {
  const tokenUtil = new TokenUtil({ logger, secretKey: config.get('secretKey') });
  const authService = new AuthService({ logger, userDao, tokenUtil });

  return authService;
};
