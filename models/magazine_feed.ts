'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { [x: string]: DataType; }) => {
  class Magazine_Feed extends Model {
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
      this.belongsTo(models.Feed, {
        foreignKey: 'feed_id'
      })
    }
  };
  Magazine_Feed.init({
    magazine_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feed_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Magazine_Feed',
  });
  return Magazine_Feed;
};