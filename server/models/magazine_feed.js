'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Magazine_Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Magazine_Feed.init({
    magazine_id: DataTypes.INTEGER,
    feed_id: DataTypes.INTEGER,
    position_x: DataTypes.FLOAT,
    position_y: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Magazine_Feed',
  });
  return Magazine_Feed;
};