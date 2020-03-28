module.exports = (sequelize, DataTypes) => {
  const OpenTime = sequelize.define(
    'OpenTime',
    {
      restaurantId: DataTypes.INTEGER,
      day: DataTypes.SMALLINT,
      openAt: DataTypes.TIME,
      closedAt: DataTypes.TIME,
    },
    {},
  );

  OpenTime.associate = models => {
    // associations can be defined here
    const { Restaurant } = models;
    OpenTime.belongsTo(Restaurant, {
      foreignKey: 'restaurantId',
      targetKey: 'id',
    });
  };
  return OpenTime;
};
