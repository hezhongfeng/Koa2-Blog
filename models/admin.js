'use strict';
const sequelize = require("./sequelize.js")
const Sequelize = require('sequelize')

const Admin = sequelize.define('admin', {
    account: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
);

Admin.sync(); //创建表

module.exports = Admin;