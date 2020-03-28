const RestaurantService = require('./RestaurantService');

module.exports = ({ logger, restaurantDao }) =>
  new RestaurantService({ logger, restaurantDao });
