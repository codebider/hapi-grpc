const stringify = require('json-stringify-safe');

module.exports = obj => JSON.parse(stringify(obj));
