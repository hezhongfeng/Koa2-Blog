'use strict';
const User = require('../proxy/user')
const Message = require('./message')

/**
 * 从文本中提取出@username 标记的用户名数组
 * @param {String} content 文本内容
 * @return {Array} 用户名数组
 */
var fetchUsers = (content)=> {
  if (!content) {
    return [];
  }

  var ignoreRegexs = [
    /```.+?```/g,
    /^```[\s\S]+?^```/gm,
    /`[\s\S]+?`/g,
    /^    .*/gm,
    /\b\S*?@[^\s]*?\..+?\b/g,
    /\[@.+?\]\(\/.+?\)/g,
  ];

  for (let ignore_regex of ignoreRegexs) {
    content = content.replace(ignore_regex, '');
  }

  var results = content.match(/@[a-z0-9\-_]+\b/igm);
  var names = [];
  if (results) {
    for (var i = 0, l = results.length; i < l; i++) {
      var s = results[i];
      s = s.slice(1);
      names.push(s);
    }
  }
  return names;
};
exports.fetchUsers = fetchUsers;

/**
 * 根据文本内容中读取用户，并发送消息给提到的用户
 * @param content 回答的内容
 * @param topic_id 主题ID
 * @param author_id 作者ID
 * @param reply_id 回复ID
 */
exports.sendMessageToMentionUsers = async(content, topic_id, author_id, reply_id)=> {
  let names = fetchUsers(content);
  let users = await User.getUsersByNames(names);
  for (let user of users) {
    await Message.sendAtMessage(user.id, author_id, topic_id, reply_id);
  }
};

/**
 * 把文本内容的@xx替换成markdown链接的形式
 * @param content 原始文本
 * @returns 处理后的文本
 */
exports.linkUsers = (content)=> {
  var names = fetchUsers(content);
  for (let name of names) {
    content = content.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')');
  }
  return content;
};