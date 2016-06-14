import Koa from 'koa'
import cors from 'koa-cors'
import compress from 'koa-compress'
import json from 'koa-json'
import send from 'koa-send'
import views from 'koa-views'
import serve from 'koa-static'
import logger from 'koa-logger'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import flash from 'koa-flash-simple'
import onerror  from 'koa-onerror'

import index from './router/index'
import user from './router/user'
import topic from './router/topic'
import create from './router/create'

const app = new Koa()

onerror(app);

// 设置Header，这个header会输出给浏览器客户端，表明这个框架是什么生成的，可以自行修改
//例如使用了ThinkPHP，会输出：X-Powered-By: ThinkPHP 2.0，我想如果是thinkjs的话就是差不多的了
app.use(async(ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2-Test')
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

app.keys = ['some secret hezf'];//设置 Signed Cookie 的密钥
app.use(convert(session(app)));

// 设置跨域
//我的网页服务器和数据库服务器域名不一样,应该是资源的限制；同一域名和同一端口
app.use(convert(cors()))

// 传输JSON
app.use(convert(json()))

// body解析
app.use(bodyParser())

//app.use(convert(session()))//会话支持，这个没接触过,这里不注释的话会报错，以后要加上
//app.use(convert(flash()))

// 设置渲染引擎
app.use(views(__dirname + '/views', {//这里应该是包含了ejs和别的一些，这里把扩展给限定为ejs
  extension: 'ejs'
}))

// 静态文件夹
app.use(convert(serve(__dirname + '/public/')))

//发送静态文件，如HTML等
app.use(async(ctx, next) => {
  ctx.send = send
  await next()
})

app.use(flash());

// app.use(async(ctx, next) => {
//   //ctx.response.flash=ctx.flash;
//   //app.locals.session = ctx.session;
//   await next();
// })

//路由，最后处理到达路由，再由路由分发到相应的处理controller,这里是简单的MVC模型
app.use(index.routes())
app.use(user.routes())
app.use(topic.routes())
app.use(create.routes())

app.listen(process.env.PORT || 3000)//这里监听3000端口，默认貌似也是3000
console.log(`Server up and running! On port ${process.env.PORT || 3000}!`);
