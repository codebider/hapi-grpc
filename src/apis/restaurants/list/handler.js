const responseMapper = require('../../../cores/commons/responseMapper');

const list = async request => {
  const { query } = request;

  const restaurantService = request.getContainer('restaurantService');

  const { data, meta } = await restaurantService.list(query);

  return responseMapper.mapData(data, meta);
};

module.exports = {
  list,
};
