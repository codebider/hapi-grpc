module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      name: DataTypes.STRING,
    },
    {},
  );

  Restaurant.associate = models => {
    // associations can be defined here
    const { OpenTime, Collection, CollectionRestaurant } = models;
    Restaurant.hasMany(OpenTime, {
      targetKey: 'id',
      foreignKey: 'restaurantId',
      as: 'openTimes',
    });

    Restaurant.belongsToMany(Collection, {
      through: 'CollectionRestaurants',
      foreignKey: 'restaurantId',
    });

    Restaurant.hasMany(CollectionRestaurant, {
      foreignKey: 'restaurantId',
      targetKey: 'id',
    });
  };
  return Restaurant;
};
