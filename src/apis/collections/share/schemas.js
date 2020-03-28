const { stringItem, id, objectItem, numberItem } = require('../../schemas');

const headerSchema = objectItem
  .keys({
    authorization: stringItem.example('TOKEN'),
  })
  .unknown();

const paramsSchema = objectItem.keys({
  id: numberItem.example(2),
});

const payloadSchema = objectItem.keys({
  email: stringItem.example('dam@gmail.com'),
});

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  paramsSchema,
  payloadSchema,
  headerSchema,
  responseSchema,
};
