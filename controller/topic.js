'use strict';
const Topic = require('../models/topic.js');
const moment = require('moment');
const markdown = require('markdown').markdown;
moment.locale('zh-cn');

const controller = module.exports = {};

/**
 * POST /login - process login
 */
controller.getTopic = async function (ctx) {
  //console.log(ctx.params.name);
  let topics = [];
  if (ctx.session.user.user_id) {
    console.log(ctx.session.user.user_id);
    topics = await Topic.getByUserId(ctx.session.user.user_id);
  }
  else {
    topics = await Topic.getAll();
  }

  topics.forEach(function (topic) {
    topic.fromNow = moment(topic.create_time).fromNow();
  })
  await ctx.render('index', {title: '主页', flash: ctx.flash.get(), session: ctx.session, topics: topics});
};

controller.readTopic = async function (ctx) {
  let topics = [];
  if (ctx.params.id) {
    console.log(ctx.session.user.user_id);
    topics = await Topic.getById(ctx.params.id);
  }
  if (topics[0]) {
    let topic = topics[0];
    topic.fromNow = moment(topic.create_time).fromNow();
    topic.content = markdown.toHTML(topic.content);
    await ctx.render('topic', {title: '', flash: ctx.flash.get(), session: ctx.session, topic: topic});
  }
  else {
    await ctx.render('back');
  }
};