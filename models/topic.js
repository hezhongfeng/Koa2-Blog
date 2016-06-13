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