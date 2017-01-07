'use strict';
const Admin = require('../models/admin.js');

/**
 * 管理员登录
 * @param ctx
 */
exports.login = async(ctx) => {
  await ctx.render('adminLogin', {
    title: '管理员登录',
  });
};

/**
 * 验证管理员登录
 * @param ctx
 */
exports.loginPost = async(ctx) => {
  var bodyData = ctx.body;
  var message = {};
  message.result = false;

  //取出数据库里的用户信息
  const adminInfo = await Admin.findOne({
    where: {
      account: bodyData.account
    }
  });

  //信息为空，说明没有这个账号
  if (!adminInfo) {
    //通过维护这个msg来向ejs里面更新信息，这里更新的是错误信息（可以将其传走更新）
    message.message = '账户错误';
    ctx.body = message;
    return ctx;
  }

  if (bodyData.password !== adminInfo.password) {
    message.message = '密码错误';
    ctx.body = message;
    return ctx;
  }

  //update session
  ctx.session.admin = adminInfo;

  message.result = true;
  console.log("登录成功");
  ctx.body = message;
  return ctx;
};

/**
 * 管理员登出
 * @param ctx
 */
exports.logout = async(ctx) => {
  session.admin = null;
  await ctx.render('admin', {
    title: '后台管理',
  });
};

/**
 * 返回管理界面
 * @param ctx
 */
exports.manage = async(ctx) => {
  await ctx.render('admin', {
    title: '后台管理',
  });
};