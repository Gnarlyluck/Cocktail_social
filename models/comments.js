'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    static associate(models) {
      comments.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      comments.belongsTo(models.Drink_posts, {
        foreignKey: 'drink_posts_id',
        onDelete:'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  comments.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drinkPostId : {
      type: DataTypes.INTEGER,
      allowNull:false,
      field: 'drink_id',
      refrences: {
        model: 'Drink_posts',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field: 'user_id',
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments'
  });
  return comments;
};