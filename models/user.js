'use strict';
const sequelize = require("./sequelize.js")
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
    },
    personalWeb: {
      type: Sequelize.STRING
    },
    GitHub: {
      type: Sequelize.STRING
    },
    avatarUrl: {
      type: Sequelize.STRING,
      defaultValue: 'http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png'
    },
    integration: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "用户积分"
    }
  },
);

User.sync(); //创建表

module.exports = User;