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
        }
      },
      feed_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Feeds'
          },
          key: 'id'
        }
      },
      position_x: {
        type: Sequelize.FLOAT
      },
      position_y: {
        type: Sequelize.FLOAT
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