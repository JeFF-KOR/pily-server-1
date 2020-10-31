'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x: string]: DataType; }) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [x: string]: ModelStatic<Model<any, any>>; }) {
      // define association here
      this.belongsTo(models.User, {
        as: 'follower',
        foreignKey: 'user_id'
      });
      this.belongsTo(models.User, {
        as: 'User',
        foreignKey: 'author_user_id'
      });
    }
  };
  Subscribe.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    author_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Subscribe',
  });
  return Subscribe;
};