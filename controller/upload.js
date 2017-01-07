'use strict';
const user = require('../models/user.js');
const uploadCloud = require("../common/uploadCloud");
const fs = require('fs');

exports.uploadAvatar = async(ctx) => {
  let message = {};
  message.result = false;

  try {
    let cloudResult = await uploadCloud.upload(ctx.body.files.avatarFile.path);
    await user.update({avatarUrl: cloudResult.url}, {
      where: {id: ctx.session.user.id}
    });

    message.avatarUrl = cloudResult.url;
    message.result = true;
  }
  catch (error) {
    console.log(error);
    message.result = false;
  }
  ctx.body = message;
}