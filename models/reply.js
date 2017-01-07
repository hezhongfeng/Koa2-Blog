'use strict';
const sequelize = require('./sequelize');
//需要类型
const Sequelize = require('sequelize');

const Reply = sequelize.define('reply', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  topic_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  support: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "点赞数"
  }
});

Reply.sync(); //创建表

module.exports = Reply;
