export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      uri: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT
    },
    {}
  );
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: "UserId" });
    Image.hasMany(models.Favorite);
  };
  return Image;
};
