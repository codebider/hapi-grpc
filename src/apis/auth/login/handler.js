const responseMapper = require('../../../cores/commons/responseMapper');

const login = async request => {
  const {
    payload: { username, password },
  } = request;

  const authService = request.getContainer('authService');

  const data = await authService.login(username, password);

  return responseMapper.mapData(data);
};

module.exports = {
  login,
};
