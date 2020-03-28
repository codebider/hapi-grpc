const UserDao = require('./UserDao');

module.exports = ({ db }) =>
  new UserDao({
    db,
    model: db.sequelize.models.User,
  });
