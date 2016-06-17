'use strict';
const Topic = require('../models/topic.js');
const user = require('../models/user.js');
const moment = require('moment');
const mditor = require('mditor');
var parser = new mditor.Parser();
moment.locale('zh-cn');

/**
 * POST /login - process login
 */
exports.getTopic = async function (ctx) {
  if (ctx.session.user && ctx.session.user.topics)
    //console.log(ctx.session.user.topics);
  var topics = [];
  if (ctx.session.user && ctx.session.user.user_id) {
    console.log('读取部分');
    console.log(ctx.session.user.user_id);
    topics = await Topic.getByUserId(ctx.session.user.user_id);
  } else {
    console.log('读取全部');
    topics = await Topic.getAll();
  }

  topics.forEach(function (topic) {
    topic.fromNow = moment(topic.create_time).fromNow();
  })
  await ctx.render('index', {title: '主页', flash: ctx.flash.get(), session: ctx.session, topics: topics});
};

exports.readTopic = async function (ctx) {
  let topics = [];
  if (ctx.params.id) {
    topics = await Topic.getById(ctx.params.id);
  }
  if (topics[0]) {
    let ttopic = topics[0];
    ttopic.fromNow = moment(ttopic.create_time).fromNow();
    ttopic.content = parser.parse(ttopic.content);
    var userTopics = await Topic.getByUserId(ttopic.user_id,5);
    var topicUser = user.getById(ttopic.user_id);
    var position = 'topic';
    await ctx.render('topic', {title: '', flash: ctx.flash.get(), session: ctx.session, topic: ttopic,userTopics:userTopics,topicUser:topicUser,position:position});
  }
  else {
    await ctx.render('back');
  }
};