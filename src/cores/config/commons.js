const pkg = require('../../../package');

module.exports = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  swagger: {
    title: pkg.description,
    version: pkg.version,
    path: '/docs',
  },
};
