'use strict';
const md5 = require('../lib/md5.js');
const User = require('../models/user.js');
const topic = require('../models/topic.js');

/**
 * POST /login - process login
 */
exports.login = async function (ctx) {
  var data = ctx.request.body;

  //取出数据库里的用户信息
  const userInfo = await User.getBy('email',data.email);
  var msg = {};
  msg.result= false;

  //信息为空，说明没有这个账号
  if (!userInfo) {
    //通过维护这个msg来向ejs里面更新信息，这里更新的是错误信息（可以将其传走更新）
    msg.error = '账户错误';
    return ctx.body = msg;
  }

  data.password = await md5.md5(data.password);
  //比较密码的哈希md5
  if (data.password !== userInfo.password) {
    msg.error = '密码错误';
    return ctx.body = msg;
  }

  ctx.session.user = {
    user_id: userInfo.id,
    name: userInfo.name,
    signature: userInfo.signature,
    email: userInfo.email,
  };

  msg.result = true;
  console.log("登录成功");
  return ctx.body = msg;
};