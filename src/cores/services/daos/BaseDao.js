/**
 * BaseDao
 * A class interface to Base table
 *
 * @class
 */
class BaseDao {
  constructor({ model, db, ...rest }) {
    Object.assign(this, rest);

    this.model = model;
    this.sequelize = db.sequelize;
    this.Sequelize = db.Sequelize;
  }

  /**
   * @see https://sequelize.org/master/manual/models-usage.html#raw-queries
   *
   * @param {Object} where
   * @param {Array} attributes - list selector, default undefined
   * @returns {Promise}
   */
  async findAll(where = {}, attributes) {
    return this.model.findAll({ raw: true, where, attributes });
  }

  /**
   * Find by id
   *
   * @param {number} id
   * @returns {Promise}
   */
  async findById(id) {
    return this.model.findByPk(id, { raw: true });
  }

  /**
   * Find one with conditions
   *
   * @param {Object} where
   * @returns {Promise}
   */
  async findOne(where) {
    return this.model.findOne({ where, raw: true });
  }

  /**
   * Create data
   *
   * @see https://sequelize.org/master/manual/model-instances.html
   *
   * @param {Object} payload
   * @returns {Promise}
   */
  async create(payload) {
    return this.model.create(payload, { raw: true });
  }

  /**
   * @see https://sequelize.org/master/manual/instances.html#working-in-bulk--creating--updating-and-destroying-multiple-rows-at-once-
   *
   * @param {Object} values
   * @param {Object} where
   * @param {Object} transaction
   * @returns {Promise}
   */
  async update(values, where = {}, transaction) {
    return this.model.update(values, { where, transaction });
  }

  async count(where = {}) {
    return this.model.count({ where });
  }

  async deleteById(id) {
    return this.model.destroy({ where: { id } });
  }

  /**
   * @see https://sequelize.org/master/manual/transactions.html
   *
   * @returns {Promise}
   */
  async transaction() {
    return this.sequelize.transaction();
  }

  /**
   * Update many records using transaction
   *
   * @param {string} key - key need to check
   * @param {Object} payload - the payload need to update
   * @returns {Promise}
   */
  async updateManyWithTransaction(key, payload) {
    const transaction = await this.transaction();
    try {
      const promises = payload.map(item => {
        const where = { [key]: item[key] };

        const values = Object.assign({}, item);
        delete values[key];

        return this.update(values, where, transaction);
      });

      await Promise.all(promises);
      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit();
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = BaseDao;
