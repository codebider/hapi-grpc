const responseMapper = require('../../../cores/commons/responseMapper');

const handle = async request => {
  const {
    params: { id: collectionId },
    payload: { email },
  } = request;

  const { id: userId } = request.getUser();

  const collectionService = request.getContainer('collectionService');

  const data = await collectionService.sendInvitation(userId, collectionId, email);

  return responseMapper.mapData(data);
};

module.exports = handle;
