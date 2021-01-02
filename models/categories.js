'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      categories.belongsToMany(models.drink_posts, {
        through: models.cat_tag,
        foreignKey: 'categories_id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    }
  };
  categories.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories'

  });
  return categories;
};