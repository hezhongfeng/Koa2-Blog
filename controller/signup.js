'use strict';
const md5 = require('../lib/md5.js');
const user = require('../models/user.js');

exports.signup = async function (ctx) {
  try {
    var data = ctx.request.body;
    data.password = await md5.md5(data.password);
    let result = await user.insert(data);
    let msg = {};
    if (result === 'emailRepeat') {
      msg.message = '此邮箱已注册';
      ctx.flash.set(msg);
      return await ctx.redirect('back');
    } else if (result === 'nameRepeat') {
      msg.message = '用户名重复';
      ctx.flash.set(msg);
      return await ctx.redirect('back');
    } else if (result === 'db_error') {
      msg.message = '数据库出错';
      ctx.flash.set(msg);
      return await ctx.redirect('back');
    } else {
      console.log(result);
      var userInfo = await user.getBy('email',data.email);
      //应该在此处更新下session
      console.log(userInfo);
      ctx.session.user = {
        user_id: userInfo.id,
        name: userInfo.name,
        signature: userInfo.signature,
        email: userInfo.email,
      };
      return await ctx.redirect('/', {title: '主页面'});
    }
  }
  catch (err) {
    console.log(err);
  }
};