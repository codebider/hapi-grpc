module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
    'Collection',
    {
      name: DataTypes.STRING,
    },
    {},
  );

  Collection.associate = models => {
    // associations can be defined here
    const { User, UserCollection, Restaurant } = models;
    Collection.belongsToMany(User, {
      through: 'UserCollection',
      foreignKey: 'collectionId',
    });

    Collection.belongsToMany(Restaurant, {
      through: 'CollectionRestaurants',
      foreignKey: 'collectionId',
    });

    Collection.hasMany(UserCollection, {
      foreignKey: 'collectionId',
      targetKey: 'id',
    });
  };
  return Collection;
};
