const responseMapper = require('../../../cores/commons/responseMapper');

const update = async request => {
  const {
    params: { id: collectionId },
    payload: { name },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.update(userId, collectionId, name);

  return responseMapper.mapData(data);
};

module.exports = {
  update,
};
