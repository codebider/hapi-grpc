const isNil = require('lodash/isNil');
const nconf = require('nconf');

const noRecurrsion = env => {
  return env.env || typeof env === 'string';
};

const getEnvValue = env => {
  if (typeof env === 'object') {
    return process.env[env.env] || env.default;
  }
  return process.env[env];
};

const buildOverride = (envVar, base = {}) => {
  return Object.keys(envVar).reduce(
    (conf, key) => {
      const env = envVar[key];
      const envVal = noRecurrsion(env) ? getEnvValue(env) : buildOverride(env, conf[key] || {});
      if (!isNil(envVal)) {
        // eslint-disable-next-line no-param-reassign
        conf[key] = envVal;
      }
      return conf;
    },
    { ...base },
  );
};

module.exports = ({ envvar = {}, envConfig = {}, common = {} }) => {
  const env = buildOverride(envvar);
  const nc = nconf
    .overrides(env)
    .add('envconfig', { type: 'literal', ...envConfig })
    .add('common', { type: 'literal', ...common });
  return {
    get: name => nc.get(name),
  };
};
