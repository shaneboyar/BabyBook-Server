import { Sequelize, DataTypes, Model } from "sequelize";
class User extends Model {}

const createUser = (sequelize: Sequelize) => {
  User.init(
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "User" // We need to choose the model name
    }
  );

  return User;
};

export default createUser;
