'use strict';
var crypto = require('crypto');

const handler = module.exports = {};
/**
 *
 * @param str 要做加密的字符串
 * @returns {*}返回哈希值
 */
handler.md5 = async(str)=> {
  return await crypto.createHash('md5').update(str).digest('hex');
};