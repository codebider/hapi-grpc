const BaseDao = require('../BaseDao');
const toJSON = require('../../../commons/helpers/toJSON');

class CollectionDao extends BaseDao {
  /**
   * Create collection with owner
   *
   * @param {number} ownerId
   * @param {string} name
   * @returns {Promise<*>}
   */
  async createWithOwner(ownerId, name) {
    const collection = await this.model.create({ name });

    // Create Owner
    const { id } = collection;
    await this.UserCollection.create({ collectionId: id, userId: ownerId });

    return collection;
  }

  /**
   * Get all collection for an user
   *
   * @param {number} userId
   * @returns {Promise<Array<Object>>}
   */
  async getAllCollectionsByUserId(userId) {
    const connection = await this.model.findAll({
      include: {
        model: this.UserCollection,
        attributes: [],
        where: { userId },
      },
    });

    return connection;
  }

  /**
   * Check owner of collection
   *
   * @param {number} userId
   * @param {number} collectionId
   * @returns {Promise<boolean>}
   */
  async checkOwner(userId, collectionId) {
    const relation = await this.UserCollection.findOne({ where: { userId, collectionId } });

    if (relation) {
      const { rule } = relation;
      return rule;
    }

    return false;
  }

  /**
   * Delete link between userId and collection
   *
   * @param {number} userId
   * @param {number} collectionId
   * @returns {Promise}
   */
  async deleteShared(userId, collectionId) {
    await this.UserCollection.destroy({ where: { userId, collectionId } });
  }

  async checkExistRestaurant(collectionId, restaurantId) {
    const count = await this.CollectionRestaurant.count({
      where: { collectionId, restaurantId },
    });

    return count > 0;
  }

  /**
   * Delete restaurant from collection
   *
   * @param {number} collectionId
   * @param {number} restaurantId
   * @returns {Promise}
   */
  async deleteRestaurant(collectionId, restaurantId) {
    await this.CollectionRestaurant.destroy({
      where: { collectionId, restaurantId },
    });
  }

  /**
   * Add restaurant to collection
   *
   * @param {number} collectionId
   * @param {number} restaurantId
   * @returns {Promise}
   */
  async addRestaurant(collectionId, restaurantId) {
    await this.CollectionRestaurant.create({ collectionId, restaurantId });
  }

  /**
   * Find all restaurants on a collection
   *
   * @param {number} collectionId
   * @returns {Promise<Array<Object>>} - list restaurants
   */
  async findAllRestaurants(collectionId) {
    const collections = await this.Restaurant.findAll({
      include: {
        model: this.CollectionRestaurant,
        attributes: [],
        where: {
          collectionId,
        },
      },
    });

    return toJSON(collections);
  }
}

module.exports = CollectionDao;
