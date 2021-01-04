'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      drinkPostId : {
        type: Sequelize.INTEGER,
        allowNull:false,
        field: 'drink_id',
        refrences: {
          model: 'Drink_posts',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('comments');
  }
};