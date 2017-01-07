const Message = require('../proxy/message');
const User = require('../proxy/user');
const Topic = require('../proxy/topic');

exports.sendReplyMessage = async(target_id, author_id, topic_id, reply_id) => {
  await Message.addMessage(target_id, topic_id, author_id, reply_id, 'reply');
};

/**
 *
 * @param target_id 通知的目标ID
 * @param author_id 作者的ID
 * @param topic_id  主题ID
 * @param reply_id  回复ID
 */
exports.sendAtMessage = async(target_id, author_id, topic_id, reply_id)=> {
  await Message.addMessage(target_id, author_id, topic_id, reply_id, 'at');
};

/**
 * 通过消息查找这个消息的作者和消息所属的topic,然后把作者名字和topic的title添加进消息
 * @param messages
 * @returns {*}
 */
exports.findUserAndTopic = async(messages)=> {
  if (!messages) {
    return;
  }
  for (let message of messages) {
    let user = await User.getUserById(message.author_id);
    let topic = await Topic.getTopicById(message.topic_id);
    message.author_name = user.name;
    message.topic_title = topic.title;
  }
  return messages;
};

exports.updateMessagesToRead = async(messages)=> {
  if (!messages) {
    return;
  }
  for (let message of messages) {
    await Message.updateMessageToRead(message.id);
  }
};