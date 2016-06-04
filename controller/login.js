'use strict';
var crypto = require('crypto');
const User = require('../models/user.js');

const handler = module.exports = {};

/**
 * POST /login - process login
 */
handler.postLogin = async function (ctx, next) {
  var data = ctx.request.body;
  console.log("post数据");
  console.log(data.email);
  console.log(data.password);
  let dbpassword = await User.get(data.email);
  console.log("数据库密码是：" + dbpassword);

  if (data.password !== dbpassword) {
    return await ctx.redirect('back');
  }
  return await ctx.redirect('index');
};