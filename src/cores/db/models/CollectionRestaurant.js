module.exports = (sequelize, DataTypes) => {
  const CollectionRestaurant = sequelize.define(
    'CollectionRestaurant',
    {
      collectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Collections',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'cascade',
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'cascade',
      },
    },
    {},
  );
  return CollectionRestaurant;
};
