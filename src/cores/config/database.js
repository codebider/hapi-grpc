// For migration
const config = require('.');

const configDB = config.get('db');

module.exports = {
  local: configDB,
  development: configDB,
  production: configDB,
};
