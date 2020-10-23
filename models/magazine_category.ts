'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x: string]: DataType; }) => {
  class Magainze_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [x: string]: ModelStatic<Model<any, any>>; }) {
      // define association here
      this.belongsTo(models.Magazine, {
        foreignKey: 'magazine_id'
      });
      this.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
    }
  };
  Magainze_Category.init({
    magazine_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Magazine_Category',
  });
  return Magainze_Category;
};