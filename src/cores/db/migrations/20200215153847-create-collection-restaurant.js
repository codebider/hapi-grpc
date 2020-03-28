module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CollectionRestaurants', {
      collectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Collections',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'cascade',
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'cascade',
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
    return queryInterface.dropTable('CollectionRestaurants');
  },
};
