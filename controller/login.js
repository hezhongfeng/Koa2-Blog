'use strict';
const encipher = require('../common/encipher.js');
const User = require('../proxy/user')

/**
 * 验证登录信息
 * @param ctx
 * @returns {*}
 */
exports.login = async(ctx) => {
  let data = ctx.body;
  let message = {};
  message.result = false;
  console.log(data);

  //取出数据库里的用户信息
  const userInfo = await User.getUserByEmail(data.email);

  //信息为空，说明没有这个账号
  if (!userInfo) {
    //通过维护这个msg来向ejs里面更新信息，这里更新的是错误信息
    message.message = '邮箱错误';
    ctx.body = message;
    return;
  }

  data.password = encipher.getMd5(data.password);
  //比较密码的md5
  if (data.password !== userInfo.password) {
    message.message = '密码错误';
    ctx.body = message;
    return;
  }

  //update session
  ctx.session.user = userInfo;

  message.result = true;
  console.log("登录成功");
  ctx.body = message;
};

/**
 * 登出，删除session信息，返回到默认主页
 * @param ctx
 */
exports.logout = async(ctx)=> {
  ctx.session = null;
  await ctx.redirect('/');
}