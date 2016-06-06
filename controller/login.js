'use strict';
var crypto = require('crypto');
const User = require('../models/user.js');

const handler = module.exports = {};

/**
 * POST /login - process login
 */
handler.postLogin = async function (ctx, next) {
  // var data = ctx.request.body;
  // console.log("post数据");
  // console.log(data.email);
  // console.log(data.password);
  // let userInfo = await User.get(data.email);//取出数据库里的用户信息
  // console.log("数据库密码是：" + userInfo.password);
  //
  // if (data.password !== userInfo.password) {
  //   ctx.flash.set({error:'账户或密码错误'});
  //   return await ctx.redirect('back',{flash: ctx.flash.get()});
  // }
  return await ctx.redirect('/user/'+"test",{title:'用户页面'});
};