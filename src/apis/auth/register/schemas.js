const { stringItem, OK, objectItem } = require('../../schemas');

const payloadSchema = objectItem.keys({
  username: stringItem.required().example('daniel93cs'),
  fullName: stringItem.required().example('daniel93cs'),
  password: stringItem.required().example('123'),
});

const responseSchema = objectItem.keys(OK);

module.exports = {
  payloadSchema,
  responseSchema,
};
