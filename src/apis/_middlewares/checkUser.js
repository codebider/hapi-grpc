const UnauthorizedError = require('../../cores/commons/errors/UnauthorizedError');

const checkUser = async request => {
  let token = request.headers['x-access-token'] || request.headers.authorization;
  if (!token) {
    throw new UnauthorizedError();
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  const auth = request.getContainer('authService');
  const user = await auth.verify(token).catch(() => {
    throw new UnauthorizedError();
  });

  request.getUser = () => {
    return user;
  };
  return null; // hapi require return
};

module.exports = checkUser;
