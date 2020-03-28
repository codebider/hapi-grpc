const responseMapper = require('../../../cores/commons/responseMapper');

const list = async request => {
  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.list(userId);

  return responseMapper.mapData(data);
};

module.exports = {
  list,
};
