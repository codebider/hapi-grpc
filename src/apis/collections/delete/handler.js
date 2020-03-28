const responseMapper = require('../../../cores/commons/responseMapper');

const deleteCollection = async request => {
  const {
    params: { id: collectionId },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  await collectionService.delete(userId, collectionId);

  return responseMapper.OK();
};

module.exports = {
  deleteCollection,
};
