const responseMapper = require('../../../cores/commons/responseMapper');

const deleteRestaurant = async request => {
  const {
    params: { id: collectionId, restaurantId },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  await collectionService.deleteRestaurant(userId, collectionId, restaurantId);

  return responseMapper.OK();
};

module.exports = {
  deleteRestaurant,
};
