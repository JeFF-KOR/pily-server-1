'use strict';
import { DataType, Model, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x: string]: DataType }) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };
  User.init({
    social_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    social_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IMG: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};