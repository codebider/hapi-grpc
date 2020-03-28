const responseMapper = require('../../../cores/commons/responseMapper');

const listRestaurants = async request => {
  const {
    params: { id: collectionId },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.listRestaurants(userId, collectionId);

  return responseMapper.mapData(data);
};

module.exports = {
  listRestaurants,
};
