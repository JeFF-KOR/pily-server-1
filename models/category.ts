'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x:string]: DataType; }) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};