'use strict';
import Koa from 'koa';
const cors = require('koa-cors');
const compress = require('koa-compress');
const json = require('koa-json');
const views = require('koa-views');
const serve = require('koa-static');
const logger = require('koa-logger');
const convert = require('koa-convert');
const body = require('koa-better-body');
import session from "koa-session2";
// import Store from "./models/store";
const onerror = require('koa-onerror');
const favicon = require('koa-favicon');
const path = require('path');
const updateDOTA2 = require('./common/updateDOTA2');
updateDOTA2.update();

import user from './routes/user';
import topic from './routes/topic';
import index from './routes/index';

const app = new Koa();
app.use(favicon(__dirname + '/public/favicon.ico'));

onerror(app);

// 设置Header，这个header会输出给浏览器客户端，表明这个框架是什么生成的，可以自行修改
app.use(async(ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})

// 设置gzip
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

//此处的convert是为了转化，实际是koa核心包含了一个叫koa-convert的模块，
//它里面warning说，以generator作为中间件的写法将在koa@3里不支持但是用co或koa-convert转过的还是可以的
// 记录所用方式与时间
app.use(convert(logger()))

/**
 * 默认关闭，需同上面的Store一起关掉注释
 * 使用自定义存储，这里面用的是Redis缓存，好处是
 * session 存放在内存中不方便进程间共享，因此可以使用 redis 等缓存来存储 session。m
 * 假设你的机器是4核的，你使用了4个进程在跑同一个node web服务，当用户访问进程1时，他被设置了一些数据当做session存在内存中。
 * 而下一次访问时，他被负载均衡到了进程2，则此时进程2的内存中没有他的信息，认为他是个新用户。这就会导致用户在我们服务中的状态不一致。
 */
app.use(session({
  //store: new Store(),
  //cookie的保存期为一天
  maxAge: 1000 * 60 * 60 * 24,
}));

// 设置跨域
//我的网页服务器和数据库服务器域名不一样,应该是资源的限制；同一域名和同一端口
app.use(convert(cors()))

// 传输JSON
app.use(convert(json()))

// body解析
app.use(convert(body({
  uploadDir: path.join(__dirname, 'uploads'),
  keepExtensions: true
})))

// 设置渲染引擎
app.use(views(__dirname + '/views', {//这里应该是包含了ejs和别的一些，这里把扩展给限定为ejs
  extension: 'ejs'
}))

// 静态文件夹
app.use(convert(serve(path.join(__dirname + '/public/'))))

//路由，最后处理到达路由，再由路由分发到相应的处理controller,这里是简单的MVC模型
app.use(index.routes())
app.use(user.routes())
app.use(topic.routes())

app.use(async(ctx) => {
  if (ctx.status === 404) {
    await ctx.render('./error/404');
  }
})

app.listen(process.env.PORT || 3000)//这里监听端口

console.log(`Server up and running! On port  ${process.env.PORT || 3000} !`);'use strict';
