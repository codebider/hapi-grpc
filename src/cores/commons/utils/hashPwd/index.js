const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = async plainTextPassword => {
  return bcrypt.hash(plainTextPassword, saltRounds);
};

const compare = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  hash,
  compare,
};
