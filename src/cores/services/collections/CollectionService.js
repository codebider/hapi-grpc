const pick = require('lodash/pick');

const throwIfMissing = require('../../commons/assertion/throwIfMissing');
const ForbiddenError = require('../../commons/errors/ForbiddenError');
const ConflictError = require('../../commons/errors/ConflictError');
const NotFoundError = require('../../commons/errors/NotFoundError');

const { RULES, EVENT_NAMES } = require('./constants');

const REQUIRED_OPTIONS = ['logger', 'collectionDao'];

/**
 * CollectionService
 * This is Collection service
 */
class CollectionService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));

    this.sendMessageToSocket = null;
  }

  /**
   * Create collection
   *
   * @param {number} ownerId
   * @param {string} name
   * @returns {Promise<Object>}
   */
  async create(ownerId, name) {
    const collection = await this.collectionDao.createWithOwner(ownerId, name);

    return collection;
  }

  /**
   * List collections
   *
   * @param {number} ownerId
   * @returns {Promise<Array>}
   */
  async list(ownerId) {
    const collections = await this.collectionDao.getAllCollectionsByUserId(ownerId);

    return collections;
  }

  /**
   * Update name of collection
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @param {string} name
   * @returns {Promise<Object>}
   */
  async update(ownerId, collectionId, name) {
    await this.checkOwner(ownerId, collectionId);

    await this.collectionDao.update({ name }, { id: collectionId });

    const collection = { id: collectionId, name };

    this.notify(collectionId, {
      event: EVENT_NAMES.UPDATE_COLLECTION,
      data: collection,
    });
    return collection;
  }

  /**
   * Delete collection by id
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @returns {Promise}
   */
  async delete(ownerId, collectionId) {
    const rule = await this.checkOwner(ownerId, collectionId);

    if (rule !== RULES.OWNER) {
      // If not owner, delete shared
      await this.collectionDao.deleteShared(ownerId, collectionId);
      return;
    }

    //  Delete the collection
    await this.collectionDao.deleteById(collectionId);

    this.notify(collectionId, {
      event: EVENT_NAMES.DELETE_COLLECTION,
      data: collectionId,
    });
  }

  /**
   * Add restaurant to collection
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @param {number} restaurantId
   * @returns {Promise}
   */
  async addRestaurant(ownerId, collectionId, restaurantId) {
    await this.checkOwner(ownerId, collectionId);

    const existed = await this.collectionDao.checkExistRestaurant(collectionId, restaurantId);

    if (existed) {
      throw new ConflictError('Already existed');
    }

    await this.collectionDao.addRestaurant(collectionId, restaurantId);

    this.notify(collectionId, {
      event: EVENT_NAMES.ADD_RESTAURANT,
    });
  }

  /**
   * Delete restaurant from collection
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @param {number} restaurantId
   * @returns {Promise}
   */
  async deleteRestaurant(ownerId, collectionId, restaurantId) {
    await this.checkOwner(ownerId, collectionId);

    const existed = await this.collectionDao.checkExistRestaurant(collectionId, restaurantId);

    if (!existed) {
      throw new NotFoundError('Not found');
    }

    await this.collectionDao.deleteRestaurant(collectionId, restaurantId);

    this.notify(collectionId, {
      event: EVENT_NAMES.DELETE_RESTAURANT,
      data: restaurantId,
    });
  }

  /**
   * List restaurants in collection
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @returns {Promise}
   */
  async listRestaurants(ownerId, collectionId) {
    await this.checkOwner(ownerId, collectionId);

    const restaurants = await this.collectionDao.findAllRestaurants(collectionId);

    return restaurants;
  }

  /**
   * Get collection info by id
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @returns {Promise<Array<Object>>}
   */
  async getById(ownerId, collectionId) {
    await this.checkOwner(ownerId, collectionId);

    const collection = await this.collectionDao.findById(collectionId);
    const restaurants = await this.collectionDao.findAllRestaurants(collectionId);

    return Object.assign(collection, { restaurants });
  }

  async sendInvitation(ownerId, collectionId, email) {
    await this.checkOwner(ownerId, collectionId);

  //  Generate token
  //  save to db
  //  send invitation



  }

  /**
   * Check owner and return rule
   *
   * @param {number} ownerId
   * @param {number} collectionId
   * @returns {Promise<*|boolean>}
   */
  async checkOwner(ownerId, collectionId) {
    const rule = await this.collectionDao.checkOwner(ownerId, collectionId);
    if (!rule) {
      throw new ForbiddenError("Don't have permission");
    }

    return rule;
  }

  /**
   * Register socket event
   *
   * @param {Function} fn
   * @returns {Promise}
   */
  async registerSocketEvent(fn) {
    this.sendMessageToSocket = fn;
  }

  /**
   * Send notify message via socket
   *
   * @param {number} collectionId
   * @param {string} message
   */
  notify(collectionId, message) {
    if (!this.sendMessageToSocket) {
      return;
    }

    this.sendMessageToSocket(collectionId, message);
  }
}

module.exports = CollectionService;
