'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Feed.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    content: DataTypes.STRING,
    location_x: DataTypes.FLOAT,
    location_y: DataTypes.FLOAT,
    location_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feed',
  });
  return Feed;
};