'use strict';
const topic = require('../models/topic.js');
const moment = require('moment');
const user = require('../models/user.js');

moment.locale('zh-cn');

/**
 * POST /login - process login
 */
exports.getHome = async function (ctx) {
  var topics = await topic.getAll();

  if(ctx.session && ctx.session.user && ctx.session.user.user_id){
    var userTopics = await topic.getByUserId(ctx.session.user.user_id,5);
  }

  if(ctx.session && ctx.session.user && ctx.session.user.email){
    const userInfo = await user.get(ctx.session.user.email);
    ctx.session.user = {
      name: userInfo.name,
      signature: userInfo.signature,
    };
  }

  topics.forEach(function (topic) {
    topic.fromNow = moment(topic.create_time).fromNow();
  })
  var position = 'home';
  await ctx.render('home', {title: '主页', flash: ctx.flash.get(), session: ctx.session, topics: topics,userTopics:userTopics,position:position});
};