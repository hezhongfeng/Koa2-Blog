const Message = require('../models/message.js');

const PAGE_COUNT = 20;//一页的数量
/**
 *
 * @param target_id
 * @param author_id
 * @param topic_id
 * @param reply_id
 * @param type
 */
exports.addMessage = async(target_id, author_id, topic_id, reply_id, type)=> {
  var messageInfo = {
    target_id: target_id,
    author_id: author_id,
    topic_id: topic_id,
    reply_id: reply_id,
    type: type,
  };

  return await Message.create(messageInfo);
}

exports.getHasReadMessage = async(target_id, page)=> {
  return await Message.findAll({
    where: {
      target_id: target_id,
      has_read: true,
    },
    offset: PAGE_COUNT * (page || 0),
    limit: PAGE_COUNT,
    order: [['createdAt', 'DESC']],
  });
}

exports.getNoReadMessage = async(target_id, page)=> {
  return await Message.findAll({
    where: {
      target_id: target_id,
      has_read: false,
    },
    offset: PAGE_COUNT * (page || 0),
    limit: PAGE_COUNT,
    order: [['createdAt', 'DESC']],
  });
}

exports.updateMessageToRead = async(id)=> {
  return await Message.update(
    {
      has_read: true,
    },
    {
      where: {id: id}
    }
  );
}

exports.getNoReadMessageCountById = async(target_id)=> {
  return await Message.count(
    {
      where: {
        target_id: target_id,
        has_read: false,
      }
    }
  );
}