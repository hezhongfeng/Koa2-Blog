'use strict';
const encipher = require('../lib/encipher.js');
const user = require('../models/user.js');
const topic = require('../models/topic.js');

/**
 *
 * @param ctx
 * @returns {{}}
 */
exports.login = async function (ctx) {
  var data = ctx.request.body;
  var message = {};
  message.result = false;

  //取出数据库里的用户信息
  const userInfo = await await user.findOne({
    where: {
      email: data.email
    }
  });

  //信息为空，说明没有这个账号
  if (!userInfo) {
    //通过维护这个msg来向ejs里面更新信息，这里更新的是错误信息（可以将其传走更新）
    message.message = '账户错误';
    ctx.body = message;
    return ctx;
  }

  data.password = await encipher.getMd5(data.password);
  //比较密码的md5
  if (data.password !== userInfo.dataValues.password) {
    message.message = '密码错误';
    ctx.body = message;
    return ctx;
  }

  //update session
  ctx.session.user = {
    user_id: userInfo.id,
    name: userInfo.name,
    signature: userInfo.signature,
    email: userInfo.email,
  };

  message.result = true;
  console.log("登录成功");
  ctx.body = message;
  return ctx;
};