'use strict';
import Client from 'mysql-pro'
const db_config = require('../config/database.json');
const client = new Client(db_config);

const Topic = module.exports = {};

Topic.getByUserId = async(user_id) => {
  try {
    return await client.query("select * from blog_topic where user_id = ?;", [user_id]);
  } catch (err) {
    console.log(err);
  }
}

Topic.getAll = async() => {
  try {
    return await client.query("select * from blog_topic;");
  } catch (err) {
    console.log(err);
  }
}

Topic.getById = async(id) => {
  try {
    return await client.query("select * from blog_topic where id = ?;", [id]);
  } catch (err) {
    console.log(err);
  }
}

Topic.create = async(data) => {
  try {
    return await client.query("insert into blog_topic ( user_id,title,content,create_time,update_time) values (?,?,?,?,?);",
      [data.user_id,
        data.title,
        data.content,
        new Date,
        new Date]);
  } catch (err) {
    console.log(err);
  }
}