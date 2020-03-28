const pick = require('lodash/pick');

const throwIfMissing = require('../../commons/assertion/throwIfMissing');

const REQUIRED_OPTIONS = ['logger', 'restaurantDao'];

/**
 * RestaurantService
 * This is restaurant service
 */
class RestaurantService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
  }

  /**
   * List restaurants filter by day, time and name
   *
   * @param {Object} filters
   * @returns {Promise<Array>}
   */
  async list(filters) {
    const { day, time, name, page = 1, limit = 10 } = filters;

    const { rows: data, count: total } = await this.restaurantDao.filterByNameAndTime(
      { day, time, name },
      page,
      limit,
    );
    return {
      data,
      meta: {
        total,
        limit,
        page,
      },
    };
  }
}

module.exports = RestaurantService;
