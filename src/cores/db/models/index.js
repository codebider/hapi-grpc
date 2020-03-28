const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const config = require('../../config');
const logger = require('../../commons/logger');

const configDB = config.get('db');

const basename = path.basename(__filename);
const { username, database, password, ...options } = configDB;
const db = {};
const models = {};
const sequelize = new Sequelize(database, username, password, {
  ...options,
  logging: message => logger.debug(message),
});

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(`./${file}`);
    const data = model(sequelize, DataTypes);
    models[data.name] = data;
  });

// Sync associate
Object.keys(models).forEach(key => {
  const item = models[key];
  if (item.associate) {
    item.associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
