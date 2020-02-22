export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      uri: DataTypes.STRING,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
      timestamp: DataTypes.INTEGER
    },
    {}
  );
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return Image;
};
