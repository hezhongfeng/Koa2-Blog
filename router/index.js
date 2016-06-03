import Router from 'koa-router'
const login = require('../controller/login.js');

const router = new Router()

router
//get
  .get('/', async(ctx, next) => {
    // 渲染模板
    console.log("渲染模板");
    await ctx.render('index', {title: 'Koa2-Easy' + ctx.path})
    //throw new ctx.Err({ message: '用户已存在', status: 400})
  })
  .get('/hezf', async(ctx, next) => {
    // 使用模板，建立主页
    await ctx.render('hezf', {title: 'Hezf'})
    await ctx.send(ctx, 'demo.html', {root: 'static/statics'});
  })
  .get('/index', async(ctx, next) => {
    // 发送静态文件
    await ctx.send(ctx, 'demo.html', {root: 'static/statics'})
  })
  .get('/signin', async(ctx, next) => {
    await ctx.render('signin', {title: '登录界面'})
  })
  .get('/reg', async(ctx, next) => {
    // 发送静态文件
    await ctx.render('reg', {title: '注册界面'})
  })

  .post('/signin', login.postLogin);
export default router
