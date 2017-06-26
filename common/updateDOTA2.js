'use strict';
const schedule = require('node-schedule');
const superagent = require('superagent-promise')(require('superagent'), Promise);
const cheerio = require('cheerio');
const targetUrl = 'http://www.gosugamers.net/dota2';
const myselfUrl = 'http://hezfblog.herokuapp.com';

let matches = [];
exports.matches = ()=> {
  return matches;
};

const getDOTA2 = async()=> {
  console.log('开始更新DOTA2赛事，时间：' + new Date());
  matches = [];
  let res = await superagent.get(targetUrl);
  let $ = cheerio.load(res.text);

  $('#gb-matches tr').each(function () {
    let match = {};
    match.opp1 = $(this).find('.opp1').find('span').eq(1).text();
    //+ $(this).find('.vs').text()
    match.opp2 = $(this).find('.opp2').find('span').eq(1).text();
    match.live = $(this).find('.live-in').text();
    matches.push(match);
  });
}

const getMyself = async()=> {
  console.log('开始访问自身防止休眠，时间：' + new Date());
  await superagent.get(myselfUrl);
}

exports.update = async()=> {
  //启动后立即执行一次爬虫
  getDOTA2();
  //每分钟0秒爬一次
  schedule.scheduleJob('0 * * * * *', function () {
    getDOTA2();
  });

  //5 mins
  // schedule.scheduleJob('30 */5 * * * *',function () {
  //   getMyself();
  // });
}
