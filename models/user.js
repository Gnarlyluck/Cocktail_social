'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Drink_posts, {
        foreignKey:'user_id',
        onDelete:'cascade',
        onUpdate:'cascade'
      })
      User.hasMany(models.Comments, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade' 
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};