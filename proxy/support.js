'use strict';
const Support = require('../models/support')

exports.changeSupportStatus = async(supportInfo)=> {
  let message = {};
  message.result = true;
  if (!supportInfo) {
    message.result = false;
    return message;
  }

  try {
    let result = await Support.findOrCreate({
      where: {
        user_id: supportInfo.user_id,
        reply_id: supportInfo.reply_id
      }
    });
    let created = result[1];

    //check the support is existent or not
    if (created) {//not existent

      message.created = true;
      return message;
    }
    else {//existent
      //destroy
      message.created = false;
      message.num = await Support.destroy({
        where: {
          user_id: supportInfo.user_id,
          reply_id: supportInfo.reply_id
        }
      });
      return message;
    }
  }
  catch (error) {
    console.log(error);
    message.result = false;
    return message;
  }
}
