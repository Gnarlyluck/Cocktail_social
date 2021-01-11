'use strict';
const {
  Model
} = require('sequelize');
const categories = require('./categories');
module.exports = (sequelize, DataTypes) => {
  class CatTag extends Model {
    static associate(models) {
    }
  };
  CatTag.init({
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
    modelName: 'CatTag',
    tableName: 'cat_tags'
  });
  return CatTag;
};