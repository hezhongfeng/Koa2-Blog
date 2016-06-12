'use strict';
import Client from 'mysql-pro'
const db_config = require('../config/database.json');
const client = new Client(db_config);

const Topic = module.exports = {};

Topic.getById = async(user_id) => {
  try {
    return await client.query("select * from blog_topic where user_id = ?;", [user_id]);
  } catch (err) {
    console.log(err);
  }
}

Topic.getAll = async() => {
  try {
    var result = await client.query("select * from blog_topic where user_id = ?;", [user_id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}