const { stringItem, numberItem, id, objectItem, allowMissing } = require('../../schemas');

const querySchema = objectItem.keys({
  day: numberItem.example(2).allow(...allowMissing),
  time: stringItem.example('10:10:00').allow(...allowMissing),
  name: stringItem.allow(...allowMissing).example('123'),
  limit: numberItem.example(10).allow(...allowMissing),
  page: numberItem.example(1).allow(...allowMissing),
});

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  querySchema,
  responseSchema,
};
