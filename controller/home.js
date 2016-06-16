'use strict';
const topic = require('../models/topic.js');
const moment = require('moment');
const markdown = require('markdown').markdown;
const mditor = require('mditor');
var parser = new mditor.Parser();
moment.locale('zh-cn');

const controller = module.exports = {};

/**
 * POST /login - process login
 */
controller.getHome = async function (ctx) {
  var topics = await topic.getAll();

  if(ctx.session.user.user_id){
    var userTopics = await topic.getByUserId(ctx.session.user.user_id,5);
  }

  topics.forEach(function (topic) {
    topic.fromNow = moment(topic.create_time).fromNow();
  })
  await ctx.render('home', {title: '主页', flash: ctx.flash.get(), session: ctx.session, topics: topics,userTopics:userTopics});
};