'use strict';
var crypto = require('crypto');
const User = require('../models/user.js');

const handler = module.exports = {};

/**
 * POST /login - process login
 */
handler.postLogin = async function (ctx, next) {
  console.log("post数据");
  // let email = ctx.request.body.email;
  // let password = ctx.request.body.password;
  // console.log("email是" + email);
  // console.log("密码是" + password);
  //
  // //生成密码的md5值,以后都需要根据这个值比较，以后的处理应该不放在这里~
  // //var md5 = crypto.createHash('md5');
  // //var password = md5.update(ctx.request.body.password).digest('hex');
  // let dbpassword = await User.get(email);
  // console.log("数据库密码是："+dbpassword);
  // if (password === dbpassword) {
  //   console.log("通过");
  //   //await ctx.render('index', {title: '注册界面'});
  //   await ctx.redirect('reg');
  //   return;
  //   //await ctx.send(ctx,'demo.html', {root: 'static/statics'});
  //   //ctx.body = 'Hello Koa';
  // } else {
  //   console.log("mu通过");
  // }
  await ctx.redirect('reg');
};