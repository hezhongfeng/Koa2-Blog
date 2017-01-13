'use strict';
const Reply = require('../models/reply')

exports.getRepliesByTopicId = async(topic_id)=> {
  if (!topic_id) {
    return [];
  }
  return await Reply.findAll({
    where: {
      topic_id: topic_id,
    },
    order: [['createdAt', 'ASC']],
  });
}

exports.createReply = async(replyInfo)=> {

  if (!replyInfo) {
    return [];
  }

  return await Reply.create(replyInfo);
}

exports.addSupport = async(id, add = true)=> {
  if (!id) {
    return {};
  }
  let reply = await Reply.findById(id);
  await Reply.update(
    {
      support: add ? (reply.support + 1) : (reply.support - 1),
    },
    {
      where: {id: id}
    }
  );

  return (add ? (reply.support + 1) : (reply.support - 1));
}

exports.getRepliesByUserId = async(user_id, order)=> {
  if (!user_id || !order) {
    return [];
  }
  let topics = await Reply.findAll(
    {
      where: {
        user_id: user_id,
      },
      order: [order],
    });
  return topics;
};