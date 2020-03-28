// Hapi.js: https://hapijs.com/api
// A rich framework for building applications and services
const createServer = require('./createServer');

const logger = require('./cores/commons/logger');

const onSignal = (server, signal) => async () => {
  logger.info(`Received signal ${signal}, gracefully shutting down`);

  try {
    await server.stop();
  } catch (error) {
    logger.error(error.stack);
  }

  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

// Main server creation routine
const main = async () => {
  const server = await createServer();

  try {
    await server.start();
  } catch (error) {
    logger.error('An error occurred while starting the server, shutting down');
    logger.error(error.stack);

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  [
    'SIGINT', // When you get (Ctrl + C)
    'SIGTERM', // On docker stop
  ].forEach(signal => {
    process.on(signal, onSignal(server, signal));
  });

  const { protocol, host, port } = server.info;
  const url = new URL(`${protocol}://${host}:${port}`);
  logger.info(`Server is running at: ${url}`);
};

process.on('unhandledRejection', error => {
  logger.error(error.stack);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

// Start the server, detail out what is going on
main();
