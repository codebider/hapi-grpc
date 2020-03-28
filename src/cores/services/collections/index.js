const CollectionService = require('./CollectionService');

module.exports = ({ logger, collectionDao }) =>
  new CollectionService({ logger, collectionDao });
