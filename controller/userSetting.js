'use strict';
const Topic = require('../proxy/topic');
const User = require('../proxy/user');
const encipher = require('../common/encipher');

/**
 * 返回用户的设置界面
 * @param ctx
 */
exports.getUserSettingPage = async(ctx) => {
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id === 'undefined') {
    return;
  }

  //更新用户的主题列表和签名
  let userTopics = {};
  userTopics = await Topic.getTopicsByUserId(ctx.session.user.id, 0, 5, ['updatedAt', 'DESC']);
  userTopics = userTopics.rows;

  let userInfo = await User.getUserById(ctx.session.user.id);
  ctx.session.user = userInfo;

  var position = 'home';
  await ctx.render('userSetting', {
    title: '账户设置',
    session: ctx.session,
    position: position,
    userTopics: userTopics,
  });
};

/**
 * 保存用户基本信息
 * @param ctx
 * @returns {*}
 */
exports.saveBasicInfo = async(ctx) => {
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id === 'undefined') {
    return;
  }
  let submitData = ctx.body;
  let message = {};
  if (typeof submitData.user_id !== 'undefined') {
    await  User.updateUser(submitData.user_id,
      {
        signature: submitData.signature,
        personalWeb: submitData.personalWeb,
        GitHub: submitData.GitHub
      });
    message.result = true;
  }
  ctx.body = message;
};

/**
 * 更新用户密码
 * @param ctx
 * @returns {*}
 */
exports.updatePassword = async(ctx) => {
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id === 'undefined') {
    return;
  }
  console.log(ctx.body);
  let submitData = ctx.body;
  let message = {};
  try {
    if (typeof submitData.user_id !== 'undefined') {
      let userInfo = await User.getUserById(submitData.user_id);
      submitData.oldPassword = encipher.getMd5(submitData.oldPassword);
      if (submitData.oldPassword === userInfo.password) {
        submitData.password = encipher.getMd5(submitData.password);
        await User.updateUser(submitData.user_id,
          {
            password: submitData.password,
          }
        );
        message.result = true;
        message.message = '修改密码成功,请重新登录';
        ctx.session = null;
      } else {
        message.message = '旧密码错误';
      }
    }
    ctx.body = message;
  }
  catch (err) {
    console.log(err);
    throw (err, 40);
  }

};