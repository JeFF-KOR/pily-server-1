'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x: string]: DataType; }) => {
  class Magazine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [x: string]: ModelStatic<Model<any, any>>; }) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  Magazine.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subTitle: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    isVertical: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    grid: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    titleAlign: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Magazine',
  });
  return Magazine;
};