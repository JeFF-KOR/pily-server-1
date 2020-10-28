'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Magazine_Feeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      magazine_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Magazines'
          },
          key: 'id'
        },
        allowNull: false
      },
      feed_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Feeds'
          },
          key: 'id'
        },
        allowNull: false
      },
      position_x: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      position_y: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('Magazine_Feeds');
  }
};