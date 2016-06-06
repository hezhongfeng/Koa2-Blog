import Router from 'koa-router'
const login = require('../controller/login');
const signup = require('../controller/signup');

const router = new Router()

router
//get
  .get('/', async(ctx) => {

    // if ('/favicon.ico' == this.path) return;
    // var n = this.session.views || 0;
    // this.session.views = ++n;
    // this.body = n + ' views';
    // if ('/favicon.ico' == this.path) return;
    // var n = ctx.request.session.views || 0;
    // ctx.request.session.views = ++n;
    // ctx.response.body = n + ' views';
    // 渲染模板
    //console.log("渲染模板");
    //await ctx.render('index', {title: 'Koa2-Easy' + ctx.path})
    //throw new ctx.Err({ message: '用户已存在', status: 400})
    await ctx.render('index', {title: 'index'})
  })
  .get('/hezf', async(ctx) => {
    // 使用模板，建立主页
    await ctx.render('hezf', {title: 'Hezf'})
    await ctx.send(ctx, 'demo.html', {root: 'static/statics'});
  })
  .get('/index', async(ctx) => {
    // 发送静态文件
    //await ctx.send(ctx, 'demo.html', {root: 'static/statics'})
    await ctx.render('index', {title: '登录界面'})
  })
  .get('/signin', async(ctx) => {
    await ctx.render('signin', {title: '登录界面',flash: ctx.flash.get()});
  })
  .post('/signin', login.postLogin)
  .get('/signup', async(ctx, next) => {
    await ctx.render('signup', {title: '注册界面',flash: ctx.flash.get()})
  })
  .post('/signup', signup.signup)

  .get('/reg', async(ctx) => {
    // 发送静态文件
    await ctx.render('reg', {title: '注册界面'})
  })


export default router
