'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { INTEGER: DataType; }) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [x: string]: ModelStatic<Model<any, any>>; }) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Magazine, {
        foreignKey: 'magazine_id'
      });
    }
  };
  Like.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    magazine_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};