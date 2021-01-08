'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cat_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drinkPostId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        field: 'drink_posts_id',
        allowNull: false,
        references: {
          model: 'drink_posts',
          key: 'id'
        }
      },
      categoriesId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        allowNull:false,
        field: 'categories_id',
        references: {
          model: 'categories',
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
    await queryInterface.dropTable('cat_tags');
  }
};