'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drink_posts extends Model {
    static associate(models) {
      drink_posts.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      drink_posts.hasMany(models.Comments, {
        foreignKey: 'drink_posts_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      drink_posts.belongsToMany(models.Categories, {
        through: 'cat_tags',
        foreignKey: 'drink_posts_id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    }
  };
  drink_posts.init({
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
    modelName: 'Drink_posts',
    tableName: 'drink_posts'
  });
  return drink_posts;
};