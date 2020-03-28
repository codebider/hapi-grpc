const Socket = require('./Socket');

module.exports = ({ logger, authService, collectionService }) =>
  new Socket({ logger, authService, collectionService });
