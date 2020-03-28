const CollectionDao = require('./CollectionDao');

module.exports = ({ db }) =>
  new CollectionDao({
    db,
    model: db.sequelize.models.Collection,
    UserCollection: db.sequelize.models.UserCollection,
    CollectionRestaurant: db.sequelize.models.CollectionRestaurant,
    Restaurant: db.sequelize.models.Restaurant,
  });
