const socketIO = require('socket.io');
const pick = require('lodash/pick');

const throwIfMissing = require('../../commons/assertion/throwIfMissing');
const UnauthorizedError = require('../../commons/errors/UnauthorizedError');
const { EVENT_NAMES } = require('./constants');

const REQUIRED_OPTIONS = ['logger', 'authService', 'collectionService'];

class Socket {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
    this.io = null;

    this.logger.info('Init socket');
  }

  init(server) {
    // TODO: using redis for scaling
    this.io = socketIO(server.listener);

    this.logger.info('Connect socket io successful');

    this.io.use(this.auth.bind(this));

    this.initEvent();
  }

  /**
   * Middware for socket
   *
   * @param {Object} socket
   * @param {Function} next
   * @returns {Promise}
   */
  async auth(socket, next) {
    const { token } = socket.handshake.query;

    if (!token) {
      next(new UnauthorizedError());
      return;
    }

    this.logger.info('Found token', token);

    try {
      // eslint-disable-next-line no-param-reassign
      socket.user = await this.authService.verify(token);
      next();
    } catch {
      next(new UnauthorizedError());
    }
  }

  /**
   * Init all events for socket
   */
  initEvent() {
    this.io.on(EVENT_NAMES.CONNECTION, socket => {
      this.logger.info(`User ${socket.user.id} connected`);

      this.eventUpdateCollection(socket);

      socket.on(EVENT_NAMES.DISCONNECT, () => {
        this.logger.info(`User ${socket.user.id} disconnected`);
      });
    });

    // register send function to collection
    this.collectionService.registerSocketEvent(this.sendToRoomCollection.bind(this));
  }

  /**
   * Socket event for updating collection
   *
   * @param {Object} socket
   */
  eventUpdateCollection(socket) {
    const userId = socket.user.id;
    socket.on(EVENT_NAMES.JOIN_COLLECTION, async data => {
      this.logger.info(`User ${userId} ask to join collectionId ${data}`);

      const collectionId = parseInt(data, 0);

      if (!collectionId) {
        socket.emit(EVENT_NAMES.ERROR_MESSAGE, 'Invalid Input');
        return;
      }

      // check if this user is owner, then join collection room
      try {
        await this.collectionService.checkOwner(userId, collectionId);
        const room = Socket.buildRoomName(collectionId);
        // Join collection room
        socket.join(room);
        socket.emit(EVENT_NAMES.JOIN_COLLECTION_SUCCESS, collectionId);
      } catch {
        // else throw error
        socket.emit(EVENT_NAMES.ERROR_MESSAGE, "Don't have permission");
      }
    });
  }

  /**
   * Send message via socket with collection room
   *
   * @param {number} collectionId
   * @param {Object} message
   */
  sendToRoomCollection(collectionId, message) {
    const room = Socket.buildRoomName(collectionId);

    this.io.to(room).emit(EVENT_NAMES.COLLECTION_UPDATE, {
      collectionId,
      message,
    });
  }

  /**
   * Build room name for collection
   *
   * @param {number} collectionId
   * @returns {string}
   */
  static buildRoomName(collectionId) {
    return `${EVENT_NAMES.COLLECTION_UPDATE_ROOM}${collectionId}`;
  }
}

module.exports = Socket;
