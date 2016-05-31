'use strict';
var crypto = require('crypto');
const User = require('../models/user.js');

const handler = module.exports = {};

/**
 * POST /login - process login
 */
handler.postLogin = async function (ctx, next) {
  let name = ctx.request.body.name;
  let password = ctx.request.body.password;
  console.log("密码是" + password);

  //生成密码的md5值,以后都需要根据这个值比较，以后的处理应该不放在这里~
  //var md5 = crypto.createHash('md5');
  //var password = md5.update(ctx.request.body.password).digest('hex');
  let dbpassword = await User.get(name);
  console.log(dbpassword);
  if (password === dbpassword[0].password) {
    console.log("通过");
    ctx.render('hezf', {title: '主页'})
  }else {
    console.log("mu通过");
  }
};