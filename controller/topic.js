'use strict';
const Topic = require('../proxy/topic')
const Reply = require('../proxy/reply')
const Support = require('../proxy/support')
const At = require('../common/at');
const ArrayFunction = require('../common/arrayFunction')
const User = require('../proxy/user');
const moment = require('moment');
const mditor = require('mditor');
const updateDOTA2 = require('../common/updateDOTA2');

const parser = new mditor.Parser();
moment.locale('zh-cn');

/**
 * 查看文章，返回解析后的文章
 * @param ctx
 */
exports.readTopic = async(ctx) => {
  let replyUserNames = [];
  let replies = [];
  let topic = {};
  let authorTopics = [];
  let topicUser = {};
  let isAuthor = false;

  if (typeof ctx.params.id !== 'undefined') {
    topic = await Topic.getTopicById(ctx.params.id);

    //增加浏览数
    await Topic.addPVCount(ctx.params.id);

    //查询这个话题的所有回复
    replies = await Reply.getRepliesByTopicId(ctx.params.id);
    for (let reply of replies) {
      //解析成带有@格式的markdown原文，这样经过markdown解析就能在回复出现对某人的连接了
      reply.content = parser.parse(At.linkUsers(reply.content));
      //使用moment，算出create到现在的汉语时间段字符串
      reply.fromNow = moment(reply.createdAt).fromNow();
      //查询此主题作者的基本信息
      let replyUser = await User.getUserById(reply.user_id);
      reply.author = replyUser;
      replyUserNames.push(replyUser.name);
    }
  }

  //去掉回答名字中的重复元素
  replyUserNames = ArrayFunction.unique(replyUserNames);

  if (typeof topic !== 'undefined') {

    //使用moment，算出create到现在的汉语时间段字符串
    topic.fromNow = moment(topic.createdAt).fromNow();

    //解析存储的markdown原文
    topic.content = parser.parse(topic.content);

    //找到作者的最近文章陈列出来
    authorTopics = await Topic.getTopicsByUserId(topic.user_id, 0, 5, ['createdAt', 'DESC']);
    authorTopics = authorTopics.rows;

    //查询此主题作者的基本信息
    topicUser = await User.getUserById(topic.user_id);
    replyUserNames.push(topicUser.name);

    //判断正在浏览的用户是否是这个主题的作者
    if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id !== 'undefined') {
      if (topic.user_id === ctx.session.user.id) {
        isAuthor = true;
      }
    }

    let matches = updateDOTA2.matches();

    var position = 'topic';
    await ctx.render('topic', {
      session: ctx.session,
      topic: topic,
      authorTopics: authorTopics,
      topicUser: topicUser,
      position: position,
      isAuthor: isAuthor,
      replies: replies,
      replyUserNames: replyUserNames,
      matches: matches,
    });
  }
};

/**
 * 新建主题
 * @param ctx
 * @returns {*}
 */
exports.createTopic = async(ctx) => {
  let message = {};
  message.result = false;
  try {
    //提取基本信息
    let topicInfo = {
      user_id: ctx.session.user.id,
      last_reply_id: ctx.session.user.id,
      title: ctx.body.title,
      content: ctx.body.editor,
    };

    //在数据库新建主题
    await Topic.createTopic(topicInfo);

    //给用户增加积分
    await User.addIntegration(ctx.session.user.id, 5);

    message.result = true;
    ctx.body = message;
    return;
  }
  catch (err) {
    message.message = '发布出错';
    ctx.body = message;
    return;
  }
};

/**
 * 编辑主题
 * @param ctx
 */
exports.editTopic = async(ctx) => {
  let topic = {};
  if (typeof ctx.params.topicId !== 'undefined') {
    topic = await Topic.getTopicById(ctx.params.topicId);
  }
  if (topic) {
    let position = 'editTopic';
    await ctx.render('topicEdit', {
      session: ctx.session,
      topic: topic,
      position: position,
    });
  }
};

/**
 * 编辑主题后，进行保存
 * @param ctx
 * @returns {*}
 */
exports.saveTopic = async(ctx) => {
  let submitData = ctx.body;
  let message = {};
  try {
    await Topic.updateTopic(submitData.topicId, submitData.title, submitData.content);
    message.result = true;
    ctx.body = message;
  }
  catch (err) {
    throw (err, 400);
  }
};

/**
 * 新建回复
 * @param ctx
 * @returns {*}
 */
exports.createReply = async(ctx) => {
  let bodyData = ctx.body;
  let message = {};

  //提取基本信息
  if (ctx.session.user.id) {
    let replyInfo = {
      user_id: ctx.session.user.id,
      topic_id: bodyData.topic_id,
      content: bodyData.content
    };

    let result = await Reply.createReply(replyInfo);

    //发送通知
    await At.sendMessageToMentionUsers(bodyData.content, bodyData.topic_id, ctx.session.user.id, result.id);

    //增加回复数
    await Topic.addReplyCount(bodyData.topic_id)

    //更新最近的回复时间，用来排序
    await Topic.updateLastReplyDateTime(bodyData.topic_id);

    //更新最后一次回复的用户ID,用来在list里显示头像
    await Topic.updateLastReplyId(bodyData.topic_id, ctx.session.user.id);

    //给用户添加积分
    await User.addIntegration(ctx.session.user.id, 2);

    message.result = true;
    message.href = '/topic/' + bodyData.topic_id + '#' + result.id;
    ctx.body = message;
  }
};

exports.getCreateTopic = async(ctx) => {
  let position = {};
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id !== 'undefined') {
    position = 'topicCreate';
    await ctx.render('topicCreate', {
      title: '发布界面',
      session: ctx.session,
      position: position,
    });
  } else {
    //这里用户没有登录，所以直接跳转到主页
    await ctx.redirect('/');
  }
};

exports.addReplySupport = async(ctx) => {
  let bodyData = ctx.body;
  let message = {};

  //用户有效
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id !== 'undefined') {
    try {
      let supportInfo = {
        user_id: ctx.session.user.id,
        reply_id: bodyData.reply_id
      };
      let result = await Support.changeSupportStatus(supportInfo);
      if (result.result) {
        message.result = true;
        if (result.created) {
          message.support = await Reply.addSupport(bodyData.reply_id);
          //添加积分
          await User.addIntegration(bodyData.reply_author_id, 1);
        }
        else {
          message.support = await Reply.addSupport(bodyData.reply_id, false);
          //去除点赞的积分
          await User.addIntegration(bodyData.reply_author_id, -1);
        }
      }
      else {
        message.result = false;
      }
    }
    catch (error) {
      message.result = false;
      message.error = error;
    }
  }

  ctx.body = message;
}
