'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DrinkPosts extends Model {
    static associate(models) {
      DrinkPosts.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      DrinkPosts.hasMany(models.Comments, {
        foreignKey: 'drink_posts_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      DrinkPosts.belongsToMany(models.Categories, {
        through: models.CatTag,
        foreignKey: 'drink_posts_id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    }
  };
  DrinkPosts.init({
    user_id:{
      type: DataTypes.STRING,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
      },
    recipe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
    }    
  }, {
    sequelize,
    modelName: 'DrinkPosts',
    tableName: 'drink_posts'
  });
  return DrinkPosts;
};