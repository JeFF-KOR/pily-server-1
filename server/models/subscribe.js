'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.User, {
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