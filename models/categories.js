'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsToMany(models.DrinkPosts, {
        through: models.CatTag,
        foreignKey: 'categories_id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    }
  };
  Categories.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories'

  });
  return Categories;
};