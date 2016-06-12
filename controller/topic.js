'use strict';
const Topic = require('../models/topic.js');

const controller = module.exports = {};

/**
 * POST /login - process login
 */
controller.getTopic = async function (ctx) {
  //console.log(ctx.params.name);
  let topics = [];
  if (ctx.session.user.user_id) {
    console.log(ctx.session.user.user_id);
    topics = await Topic.getById(ctx.session.user.user_id);
  }
  else {
    topics = await Topic.getAll();
  }

  await ctx.render('index', {title: '主页',flash: ctx.flash.get(), session: ctx.session ,topics:topics});
};