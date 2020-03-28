const { stringItem, id, objectItem } = require('../../schemas');

const payloadSchema = objectItem.keys({
  username: stringItem.required().example('daniel93cs'),
  password: stringItem.required().example('123'),
});

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  payloadSchema,
  responseSchema,
};
