module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserCollections', {
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'cascade',
      },
      rule: {
        type: Sequelize.ENUM,
        values: ['owner', 'shared'],
        defaultValue: 'owner',
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
    return queryInterface.dropTable('UserCollections');
  },
};
