const BaseDao = require('../BaseDao');
const toJSON = require('../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../commons/helpers/purgeMissingProperties');

class RestaurantDao extends BaseDao {
  async filterByNameAndTime({ time, day, name }, page = 1, limit = 10) {
    const { Op } = this.Sequelize;
    const offset = (page - 1) * limit;

    // Build query for time
    let openAt;
    let closedAt;
    if (time) {
      openAt = {
        [Op.lte]: time,
      };
      closedAt = {
        [Op.gte]: time,
      };
    }
    let queryName;
    if (name) {
      queryName = {
        [Op.like]: `%${name}%`,
      };
    }
    const where = purgeMissingProperties({ name: queryName });
    const whereOpenTime = purgeMissingProperties({ day, openAt, closedAt });
    const data = await this.model.findAndCountAll({
      where,
      offset,
      limit,
      distinct: this.model.name,
      attributes: ['id', 'name'],
      include: {
        model: this.OpenTime,
        where: whereOpenTime,
        as: 'openTimes',
        attributes: ['id', 'day', 'openAt', 'closedAt'],
      },
    });
    return toJSON(data);
  }
}

module.exports = RestaurantDao;
