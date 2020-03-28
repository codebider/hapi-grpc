module.exports = {
  setupFiles: ['jest-plugin-unhandled-promise/setup', '<rootDir>/src/setupTests'],
  setupFilesAfterEnv: ['jest-extended'],
  coverageReporters: ['json-summary', 'lcov', 'text'],
};
