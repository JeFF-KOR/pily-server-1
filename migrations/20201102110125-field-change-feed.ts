'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Feeds', 'content', {
      type: Sequelize.TEXT('long'),
      allowNull: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Feeds', 'content', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};