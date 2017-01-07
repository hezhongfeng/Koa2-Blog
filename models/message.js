'use strict';
const sequelize = require("./sequelize.js")
const Sequelize = require('sequelize')  //这个是为了使用Sequelize里提供的各种静态数据类型DataTypes

const Message = sequelize.define('message', {
  target_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  topic_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reply_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "reply:xxx回复了你的话题「xxx」;at:xxx在话题「xxx」中@了你"
  },
  has_read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    comment: "消息是否被读取，默认为false"
  }
});

Message.sync(); //创建表

module.exports = Message;