'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      Comments.belongsTo(models.DrinkPosts, {
        foreignKey: 'drink_posts_id',
        onDelete:'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Comments.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drinkPostId : {
      type: DataTypes.INTEGER,
      allowNull:false,
      field: 'drink_posts_id',
      refrences: {
        model: 'drink_posts',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field: 'user_id',
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments'
  });
  return Comments;
};