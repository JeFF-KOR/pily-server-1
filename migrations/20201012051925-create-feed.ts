'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Feeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subTitle: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location_x: {
        type: Sequelize.STRING
      },
      location_y: {
        type: Sequelize.STRING
      },
      location_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Feeds');
  }
};