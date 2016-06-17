'use strict';

const topic = require('../models/topic.js');

exports.post = async function (ctx) {
  console.log("create post 数据");
  console.log(ctx.session.user.user_id);
  try {
    var data = {};
    data.user_id = ctx.session.user.user_id;
    data.title = ctx.request.body.title;
    data.content = ctx.request.body.content;
    await topic.create(data);
    return await ctx.redirect('/');
  }
  catch (err) {
    console.log(err);
    return await ctx.redirect('back');
  }
};