const { stringItem, id, objectItem } = require('../../schemas');

const payloadSchema = objectItem.keys({
  name: stringItem.example('123'),
});

const headerSchema = objectItem
  .keys({
    authorization: stringItem.example('TOKEN'),
  })
  .unknown();

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  headerSchema,
  payloadSchema,
  responseSchema,
};
