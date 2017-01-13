'use strict';
const Topic = require('../proxy/topic');
const Moment = require('moment');
const User = require('../proxy/user');
const Message = require('../proxy/message');
const updateDOTA2 = require('../common/updateDOTA2');

Moment.locale('zh-cn');

/**
 * 主页显示
 * @param ctx
 */
exports.getHome = async(ctx) => {
  let pageCount; //主题的页数
  const onePageCount = 15; //一页的主题数量,其实配置不应该放这里
  let activePage = ctx.query.p || 1;//当前页
  let noReadMessageCount = 0;//没读取消息的数量
  let userTopics = [];

  // try {
  //更新主页的主题列表以及过去的时间
  let topics_result = await Topic.getTopicsAndCount(activePage,onePageCount, ['last_reply_date_time', 'DESC']);
  pageCount = Math.ceil(topics_result.count / onePageCount);
  let topics = topics_result.rows;

  for (let topic of topics) {
    topic.user = await User.getUserById(topic.user_id);
    topic.fromNow = Moment(topic.createdAt).fromNow();

    //使用moment，算出create到现在的汉语时间段字符串
    topic.lastReplyFromNow = Moment(topic.last_reply_date_time).fromNow();

    topic.lastCommentUser = await User.getUserById(topic.last_reply_id);
  }

  //更新用户的主题列表和签名
  if (typeof ctx.session.user !== 'undefined' && typeof ctx.session.user.id !== 'undefined') {
    userTopics = await Topic.getTopicsByUserId(ctx.session.user.id, 0, 5, ['last_reply_date_time', 'DESC']);
    userTopics = userTopics.rows;
    //更新用户基本信息，有很多时候用户不需要登录直接访问主页面
    ctx.session.user = await User.getUserById(ctx.session.user.id);

    //查询未读取的消息数量，这里使用var比较合适
    noReadMessageCount = await Message.getNoReadMessageCountById(ctx.session.user.id);
  }

  //let matches = await DOTA2.getDOTA2();

  let matches = updateDOTA2.matches();

  //console.log(matches);

  var position = 'home';
  await ctx.render('home', {
    title: '主页',
    session: ctx.session,
    topics: topics,
    userTopics: userTopics,
    position: position,
    activePage: activePage,
    pageCount: pageCount,
    noReadMessageCount: noReadMessageCount,
    matches: matches,
  });
};