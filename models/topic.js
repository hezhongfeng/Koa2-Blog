'use strict';
const sequelize = require("./sequelize.js")
import Sequelize from 'Sequelize'

var Topic = sequelize.define('topic', {
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  },
  allow_comment: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue:1,
    comment: "1：允许评论；0：不允许评论"
  },
  is_public: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue:1,
    comment: "1：公开；0：不公开"
  }});

Topic.sync(); //创建表

module.exports = Topic;


// import Client from 'mysql-pro'
// const db_config = require('../config/database.json');
// const client = new Client(db_config);
//
// exports.get = async(id) => {
//   try {
//     const result = await client.query("select * from blog_topic where id = ?;", [id]);
//     const users = result[0];
//     return users;
//   } catch (err) {
//     throw (err);
//   }
// }
//
// exports.getByUserId = async(user_id, limit_count) => {
//   try {
//     if (limit_count) {
//       return await client.query("select id,title from blog_topic where user_id = ? order by create_time desc limit ? ;", [user_id, limit_count]);
//     }
//     else {
//       return await client.query("select * from blog_topic where user_id = ?;", [user_id]);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
//
// exports.getAll = async() => {
//   try {
//     return await client.query("select * from blog_topic;");
//   } catch (err) {
//     console.log(err);
//   }
// }
//
// exports.create = async(data) => {
//   try {
//     return await client.query("insert into blog_topic ( user_id,title,content,create_time,update_time) values (?,?,?,?,?);",
//       [data.user_id,
//         data.title,
//         data.content,
//         new Date,
//         new Date]);
//   } catch (err) {
//     console.log(err);
//   }
// }