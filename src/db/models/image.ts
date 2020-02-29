import { Sequelize, DataTypes, Model } from "sequelize";
class Image extends Model {}

const createImage = (sequelize: Sequelize) => {
  Image.init(
    {
      // Model attributes are defined here
      uri: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preview: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      story: {
        type: DataTypes.TEXT
      },
      milestone: {
        type: DataTypes.STRING
      }
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Image" // We need to choose the model name
    }
  );

  return Image;
};

export default createImage;
