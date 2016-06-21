'use strict';
const sequelize = require("./sequelize.js")
import Sequelize from 'Sequelize'

var User = sequelize.define('user', {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true//唯一的
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: Sequelize.STRING
    },
    signature: {
      type: Sequelize.STRING
    }
  },
  // { // Model tableName will be the same as the model name
  //   freezeTableName: true
  // }
);

User.sync(); //创建表

module.exports = User;