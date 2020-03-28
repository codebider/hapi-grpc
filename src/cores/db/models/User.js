module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      hashPassword: DataTypes.STRING,
    },
    {},
  );

  User.associate = models => {
    // associations can be defined here
    const { Collection } = models;
    User.belongsToMany(Collection, {
      through: 'UserCollection',
      foreignKey: 'userId',
    });
  };
  return User;
};
