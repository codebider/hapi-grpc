const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurants');
const collectionRoutes = require('./collections');

const checkUser = require('./_middlewares/checkUser');
const apply = require('./_middlewares/apply');

module.exports = [...authRoutes, ...restaurantRoutes, ...apply(collectionRoutes, [checkUser])];
