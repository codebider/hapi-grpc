const createConfiguration = require('../commons/utils/config/createConfiguration');
const commons = require('./commons');
const envvar = require('./envvar.json');

const env = (process.env.NODE_ENV || 'development').toLowerCase();

const composeCommon = {
  ...commons,
};

// eslint-disable-next-line import/no-dynamic-require, security/detect-non-literal-require
const envConfig = require(`./${env}.json`);
const config = createConfiguration({
  envvar: { ...envvar, env },
  envConfig,
  common: composeCommon,
});

module.exports = config;
