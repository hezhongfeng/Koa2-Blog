'use strict';
const topic = require('../models/topic.js');
const moment = require('moment');
const user = require('../models/user.js');
moment.locale('zh-cn');

/**
 * POST /login - process login
 */
exports.getHome = async function (ctx) {
  //更新主页的主题列表以及过去的时间
  var topics = await topic.findAndCountAll({
    offset: 0,
    limit: 15,
  });
  console.log("一共有" + topics.count + "篇主题");
  console.log(topics.rows);
  topics = topics.rows;

  topics.forEach(function (topic) {
    topic.fromNow = moment(topic.dataValues.createdAt).fromNow();
  })

  //更新用户的主题列表和签名
  var userTopics = {};
  if (ctx.session.user && ctx.session.user.user_id) {
    userTopics = await topic.find({
      where: {
        user_id: ctx.session.user.user_id
      },
      offset: 0,
      limit: 5,
    });
    userTopics = userTopics.rows;

    let userInfo = await user.findById(ctx.session.user.user_id);
    userInfo = userInfo.dataValues;
    ctx.session.user.signature = userInfo.signature;
  }

  var position = 'home';
  await ctx.render('home', {
    title: '主页',
    flash: ctx.flash.get(),
    session: ctx.session,
    topics: topics,
    userTopics: userTopics,
    position: position
  });
};