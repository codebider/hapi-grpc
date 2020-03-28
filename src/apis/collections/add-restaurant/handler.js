const responseMapper = require('../../../cores/commons/responseMapper');

const addRestaurant = async request => {
  const {
    params: { id: collectionId, restaurantId },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  await collectionService.addRestaurant(userId, collectionId, restaurantId);

  return responseMapper.OK();
};

module.exports = {
  addRestaurant,
};
