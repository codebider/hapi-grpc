module.exports = {
  up: async queryInterface => {
    const names = [
      'Kushi Tsuru',
      'Osakaya Restaurant',
      'The Stinking Rose',
      "McCormick & Kuleto's",
    ];

    const payload = names.map(item => ({
      name: item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Restaurants', payload, {});
    const { sequelize } = queryInterface;
    const restaurants = await sequelize.query('SELECT id FROM "Restaurants"', {
      type: sequelize.QueryTypes.SELECT,
    });

    const openTimes = restaurants.map(({ id }) => ({
      restaurantId: id,
      day: 1,
      openAt: '10:10:00',
      closedAt: '15:34:00',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('OpenTimes', openTimes, {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('OpenTimes', null, {});
    await queryInterface.bulkDelete('Restaurants', null, {});
  },
};
