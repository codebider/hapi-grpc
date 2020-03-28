const create = require('./create/route');
const list = require('./list/route');
const update = require('./update/route');
const deleteRoute = require('./delete/route');
const addRestaurant = require('./add-restaurant/route');
const deleteRestaurant = require('./delete-restaurant/route');
const listRestaurants = require('./list-restaurants/route');
const get = require('./get/route');
const share = require('./share/route');

module.exports = [
  get,
  share,
  create,
  list,
  update,
  deleteRoute,
  addRestaurant,
  deleteRestaurant,
  listRestaurants,
];
