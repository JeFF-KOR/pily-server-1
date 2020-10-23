'use strict';
import { DataType, Model, ModelStatic, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, DataTypes: { INTEGER: DataType; STRING: DataType; FLOAT: DataType; }) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [x:string]: ModelStatic<Model<any, any>>; }) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  Feed.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subTitle: DataTypes.STRING,
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_x: DataTypes.FLOAT,
    location_y: DataTypes.FLOAT,
    location_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feed',
  });
  return Feed;
};