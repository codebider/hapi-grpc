const responseMapper = require('../../../cores/commons/responseMapper');

const handle = async request => {
  const {
    params: { id: collectionId },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.getById(userId, collectionId);

  return responseMapper.mapData(data);
};

module.exports = handle;
