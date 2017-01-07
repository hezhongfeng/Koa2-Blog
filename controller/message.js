'use strict';
const Message = require('../proxy/message.js');
const CommonMessage = require('../common/message');

/**
 * 查看消息，看完后，所有消息变为已查看的状态
 * @param ctx
 */
exports.message = async(ctx) => {
  let hasReadMessages = await Message.getHasReadMessage(ctx.session.user.id);
  let noReadMessages = await Message.getNoReadMessage(ctx.session.user.id);

  console.log(hasReadMessages);
  console.log(noReadMessages);

  hasReadMessages = await CommonMessage.findUserAndTopic(hasReadMessages);
  noReadMessages = await CommonMessage.findUserAndTopic(noReadMessages);

  //更新消息为已查看状态
  await CommonMessage.updateMessagesToRead(noReadMessages);

  await ctx.render('message', {
    session: ctx.session,
    hasReadMessages: hasReadMessages,
    noReadMessages: noReadMessages,
  });
};