'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Feeds', 'stars', {
      type: Sequelize.INTEGER
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Feeds', 'stars');
  }
};