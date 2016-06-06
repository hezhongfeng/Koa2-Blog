'use strict';
const md5 = require('../lib/md5.js');
const User = require('../models/user.js');

const handler = module.exports = {};

handler.signup = async function (ctx) {
  console.log('注册页面提交表单');
  try {
    var data = ctx.request.body;
    data.password = await md5.md5(data.password);
    let result = await User.createUser(data);
    if (result === 'repeat') {
      ctx.flash.set({message: '此邮箱已注册'});
      return await ctx.redirect('back', {flash: ctx.flash.get()});
    }
    else if (result === 'db_error') {
      ctx.flash.set({message: '数据库出错'});
      return await ctx.redirect('back', {flash: ctx.flash.get()});
    }
    else {
      return await ctx.redirect('/user/' + "test", {title: '用户页面'});
    }
  }
  catch (err) {
    console.log(err);
  }
};