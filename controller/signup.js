'use strict';
const encipher = require('../common/encipher.js');
const User = require('../proxy/user');

exports.signUp = async(ctx) => {
  try {
    var data = ctx.body;
    let message = {};
    message.result = false;

    // check is username exist
    let isUsernameExist = await User.getUserByName(data.name);
    if (isUsernameExist) {
      message.message = '用户名已注册';
      ctx.body = message;
      return;
    }

    // check is email exist
    let isEmailExist = await User.getUserByEmail(data.email);
    if (isEmailExist) {
      message.message = '此邮箱已注册';
      ctx.body = message;
      return;
    }

    data.password = encipher.getMd5(data.password);
    var userInfo = {
      name: data.name,
      password: data.password,
      email: data.email,
      gender: data.gender,
      signature: data.signature
    };

    await User.createUser(userInfo);
    message.result = true;

    //从数据库里重新查找刚才新插入的用户信息
    userInfo = await User.getUserByEmail(data.email);

    //update session
    ctx.session.user = userInfo;
    ctx.body = message;
    return;
  }
  catch (err) {
    console.log(err);
    throw (err, 400);
  }
};