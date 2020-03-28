const Joi = require('@hapi/joi');

// General
const stringItem = Joi.string();

const numberItem = Joi.number();

const objectItem = Joi.object();

// Specific
const id = numberItem.example(10);

const allowMissing = ['', null];

// OK response
const OK = {
  success: true,
};

module.exports = {
  allowMissing,
  objectItem,
  numberItem,
  stringItem,
  id,
  OK,
};
