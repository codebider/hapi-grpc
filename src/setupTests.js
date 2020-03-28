// We don't want to see noisy logging messages while running unit tests
jest.mock('./cores/commons/logger', () => {
  const logger = {
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  return logger;
});
