'use strict';
const {
  Model
} = require('sequelize');
const categories = require('./categories');
module.exports = (sequelize, DataTypes) => {
  class cat_tag extends Model {
    static associate(models) {
    }
  };
  cat_tag.init({
    drinkPostId: {
      type: DataTypes.INTEGER,
      field: 'drink_posts_id',
      allowNull: false,
      references: {
        model: 'drink_posts',
        key: 'id'
      }
    },
    categoriesId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field: 'categories_id',
      references: {
        model: 'categories',
        key: 'id'
      }
    }
}, {
    sequelize,
    modelName: 'Cat_tag',
    tableName: 'cat_tags'
  });
  return cat_tag;
};