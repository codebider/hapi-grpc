module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OpenTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
        allowNull: false,
      },
      day: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      openAt: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      closedAt: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('OpenTimes');
  },
};
