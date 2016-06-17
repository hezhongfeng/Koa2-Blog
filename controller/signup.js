'use strict';
const md5 = require('../lib/md5.js');
const User = require('../models/user.js');

exports.signup = async function (ctx) {
  try {
    var data = ctx.request.body;
    data.password = await md5.md5(data.password);
    let result = await User.createUser(data);
    let msg = {};
    if (result === 'repeat') {
      msg.message = '此邮箱已注册';
      ctx.flash.set(msg);
      return await ctx.redirect('back');
    }
    else if (result === 'db_error') {
      msg.message = '数据库出错';
      ctx.flash.set(msg);
      return await ctx.redirect('back');
    }
    else {
      return await ctx.redirect('/user/', {title: '用户页面'});
    }
  }
  catch (err) {
    console.log(err);
  }
};