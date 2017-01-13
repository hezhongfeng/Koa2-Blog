const Topic = require('../models/topic');
const Moment = require('moment');

/**
 *
 * @param ids
 * @returns {*}
 */
exports.getTopicsByIds = async(ids)=> {
  if (!ids) {
    return [];
  }
  let topics = await Topic.findAll({
    where: {id: ids,},
  });
  return topics;
};

/**
 * 通过主题id查询主题
 * @param id
 * @returns {*}
 */
exports.getTopicById = async(id)=> {
  if (!id) {
    return {};
  }
  let topic = await Topic.findById(id);
  return topic;
};

exports.getTopicsAndCount = async(activePage, onePageCount, order)=> {
  if (!activePage || !order) {
    return [];
  }
  let topics = await Topic.findAndCountAll({
    offset: (activePage - 1) * onePageCount,
    limit: onePageCount,
    order: [order],
  });
  return topics;
};

exports.getTopicsByUserId = async(user_id, offset, limit, order)=> {
  if (!user_id || !order) {
    return [];
  }
  let topics = await Topic.findAndCount(
    {
      where: {
        user_id: user_id,
      },
      offset: offset,
      limit: limit,
      order: [order],
    });
  return topics;
};

/**
 * 默认增加1，以后可以扩展
 * @param id
 * @returns {*}
 */
exports.addPVCount = async(id)=> {
  if (!id) {
    return {};
  }
  let topic = await Topic.findById(id);
  return await Topic.update(
    {
      pv: topic.pv + 1,
    },
    {
      where: {id: id}
    }
  );
};

exports.createTopic = async(topicInfo)=> {
  if (!topicInfo) {
    return {};
  }
  return await Topic.create(topicInfo);
};

exports.updateTopic = async(id, title, content)=> {
  if (!id || !title || !content) {
    return {};
  }

  return await Topic.update({
      title: title,
      content: content,
    },
    {
      where: {id: id}
    });
};


exports.addReplyCount = async(id)=> {
  if (!id) {
    return {};
  }

  let topic = await Topic.findById(id);
  return await Topic.update(
    {
      reply_count: topic.reply_count + 1,
    },
    {
      where: {id: id}
    }
  );
};

exports.updateLastReplyDateTime = async(id)=> {
  if (!id) {
    return {};
  }

  return await Topic.update(
    {
      last_reply_date_time: Moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      where: {id: id}
    }
  );
};

exports.updateLastReplyId = async(id, last_reply_id)=> {
  if (!id) {
    return {};
  }

  return await Topic.update(
    {
      last_reply_id: last_reply_id,
    },
    {
      where: {id: id}
    }
  );
};