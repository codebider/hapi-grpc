const responseMapper = require('../../../cores/commons/responseMapper');

const create = async request => {
  const {
    payload: { name },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.create(userId, name);

  return responseMapper.mapData(data);
};

module.exports = {
  create,
};
