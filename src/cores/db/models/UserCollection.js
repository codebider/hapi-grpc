module.exports = (sequelize, DataTypes) => {
  const UserCollection = sequelize.define(
    'UserCollection',
    {
      rule: DataTypes.STRING,
      collectionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );

  UserCollection.associate = models => {
    // associations can be defined here
    const { Collection } = models;
    UserCollection.belongsTo(Collection, {
      foreignKey: 'collectionId',
      targetKey: 'id',
    });
  };
  return UserCollection;
};
