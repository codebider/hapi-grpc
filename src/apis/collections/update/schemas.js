const { stringItem, numberItem, id, objectItem } = require('../../schemas');

const payloadSchema = objectItem.keys({
  name: stringItem.example('123'),
});

const paramsSchema = objectItem.keys({
  id: numberItem.example(2),
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
  paramsSchema,
  payloadSchema,
  responseSchema,
};
