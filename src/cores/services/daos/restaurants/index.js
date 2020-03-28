const RestaurantDao = require('./RestaurantDao');

module.exports = ({ db }) =>
  new RestaurantDao({
    db,
    model: db.sequelize.models.Restaurant,
    OpenTime: db.sequelize.models.OpenTime,
  });
