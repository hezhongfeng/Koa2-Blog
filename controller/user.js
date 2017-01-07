'use strict';
const Topic = require('../proxy/topic.js');
const User = require('../proxy/user.js');
const Reply = require('../proxy/reply');
const ArrayFunction = require('../common/arrayFunction');
const updateDOTA2 = require('../common/updateDOTA2');
const Moment = require('moment');
const Message = require('../proxy/message');

Moment.locale('zh-cn');

/**
 * 返回用户界面
 * @param ctx
 */
exports.getUserPage = async(ctx) => {
  if (typeof ctx.params.name !== 'undefined') {
    let userReplyTopics = [];

    var userInfo = await User.getUserByName(ctx.params.name);

    //更新查看用户的主题列表
    var userTopics = await Topic.getTopicsByUserId(userInfo.id, 0, 5, ['updatedAt', 'DESC']);
    userTopics = userTopics.rows;

    //用户参与的reply
    let Replies = await Reply.getRepliesByUserId(userInfo.id, ['createdAt', 'DESC']);
    let topicIds = [];
    for (let reply of Replies) {
      topicIds.push(reply.topic_id);
    }
    //去掉重复topicId
    topicIds = ArrayFunction.unique(topicIds);
    topicIds = topicIds.slice(0, 5);
    userReplyTopics = await Topic.getTopicsByIds(topicIds);

    let matches = updateDOTA2.matches();

    let position = 'userPage';
    await ctx.render('user', {
      title: '用户主页',
      session: ctx.session,
      userTopics: userTopics,
      userReplyTopics: userReplyTopics,
      position: position,
      userInfo: userInfo,
      matches: matches,
    });
  }
};

exports.getUserRepliesPage = async(ctx) => {
  console.log(ctx.params.name);
  let pageCount; //主题的页数
  const onePageCount = 20; //一页的主题数量
  let activePage = ctx.query.p || 1;//当前页
  let noReadMessageCount = 0;//没读取消息的数量
  let userTopics = [];
  let userInfo = {};
  let topics = [];

  userInfo = await User.getUserByName(ctx.params.name);

  let Replies = await Reply.getRepliesByUserId(userInfo.id, ['createdAt', 'DESC']);
  let topicIds = [];
  for (let reply of Replies) {
    topicIds.push(reply.topic_id);
  }
  //去掉重复topicId
  topicIds = ArrayFunction.unique(topicIds);
  topicIds = topicIds.slice((activePage - 1) * onePageCount, activePage * onePageCount);

  topics = await Topic.getTopicsByIds(topicIds);

  for (let topic of topics) {
    topic.user = await User.getUserById(topic.user_id);
    topic.fromNow = Moment(topic.createdAt).fromNow();

    //使用moment，算出create到现在的汉语时间段字符串
    topic.lastReplyFromNow = Moment(topic.last_reply_date_time).fromNow();

    topic.lastCommentUser = await User.getUserById(topic.last_reply_id);
  }

  //更新用户的主题列表和签名
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id !== 'undefined') {
    userTopics = await Reply.getRepliesByUserId(ctx.session.user.id, 0, 5, ['last_reply_date_time', 'DESC']);
    userTopics = userTopics.rows;
    //更新用户基本信息，有很多时候用户不需要登录直接访问主页面
    ctx.session.user = await User.getUserById(ctx.session.user.id);

    //查询未读取的消息数量，这里使用var比较合适
    noReadMessageCount = await Message.getNoReadMessageCountById(ctx.session.user.id);
  }

  let matches = updateDOTA2.matches();

  await ctx.render('userReplies', {
    title: '主页',
    session: ctx.session,
    topics: topics,
    userTopics: userTopics,
    activePage: activePage,
    pageCount: pageCount,
    noReadMessageCount: noReadMessageCount,
    matches: matches,
  });
};

exports.getUserTopicsPage = async(ctx) => {
  console.log(ctx.params.name);
  let pageCount = 1; //主题的页数
  const onePageCount = 20; //一页的主题数量
  let activePage = ctx.query.p || 1;//当前页
  let noReadMessageCount = 0;//没读取消息的数量
  let userInfo = {};
  let topics = [];

  userInfo = await User.getUserByName(ctx.params.name);

  let topics_result = await Topic.getTopicsByUserId(userInfo.id,(activePage-1)*onePageCount,onePageCount, ['createdAt', 'DESC']);
  pageCount = Math.ceil(topics_result.count / onePageCount);
  topics = topics_result.rows;

  for (let topic of topics) {
    topic.user = await User.getUserById(topic.user_id);
    topic.fromNow = Moment(topic.createdAt).fromNow();

    //使用moment，算出create到现在的汉语时间段字符串
    topic.lastReplyFromNow = Moment(topic.last_reply_date_time).fromNow();

    topic.lastCommentUser = await User.getUserById(topic.last_reply_id);
  }

  let matches = updateDOTA2.matches();
  await ctx.render('userTopics', {
    title: '主页',
    session: ctx.session,
    topics: topics,
    activePage: activePage,
    pageCount: pageCount,
    noReadMessageCount: noReadMessageCount,
    matches: matches,
  });
};