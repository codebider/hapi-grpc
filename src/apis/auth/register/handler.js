const responseMapper = require('../../../cores/commons/responseMapper');

const register = async request => {
  const { payload } = request;

  const authService = request.getContainer('authService');

  await authService.register(payload);

  return responseMapper.OK();
};

module.exports = {
  register,
};
