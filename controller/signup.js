'use strict';
const encipher = require('../lib/encipher.js');
const user = require('../models/user.js');

exports.signup = async function (ctx) {
  try {
    var data = ctx.request.body;
    let message = {};
    message.result = false;

    // check is username exist
    let isUsernameExist = await user.findOne({
      where: {
        userName: data.name
      }
    })

    if (isUsernameExist) {
      message.message = '用户名已注册';
      ctx.body = message;
      return ctx;
    }

    // check is email exist
    let isEmailExist = await user.findOne({
      where: {
        email: data.email
      }
    })

    if (isEmailExist) {
      message.message = '此邮箱已注册';
      ctx.body = message;
      return ctx;
    }

    data.password = await encipher.getMd5(data.password);
    var userInfo = {
      userName: data.name,
      password: data.password,
      email: data.email,
      gender: data.gender,
      signature: data.signature
    };

    let createResult = await user.create(userInfo);
    console.log(createResult);
    message.result = true;

    userInfo = await user.findOne({
      where: {
        email: data.email
      }
    });

    //update session
    ctx.session.user = {
      user_id: userInfo.dataValues.id,
      name: userInfo.dataValues.name,
      signature: userInfo.dataValues.signature,
      email: userInfo.dataValues.email,
    };
    ctx.body = message;
    return ctx;
  }
  catch (err) {
    console.log(err);
  }
};