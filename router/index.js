import Router from 'koa-router'
const login = require('../controller/login');
const signup = require('../controller/signup');

const router = new Router()

router

  /**
   * 主页
   */
  .get('/', async(ctx) => {
    await ctx.render('index', {title: 'index'})
  })

  /**
   * 登录页面
   */
  .get('/signin', async(ctx) => {
    await ctx.render('signin', {title: '登录界面', flash: ctx.flash.get(), session: ctx.session});
  })
  .post('/signin', login.postLogin)

  /**
   * 注册页面
   */
  .get('/signup', async(ctx, next) => {
    await ctx.render('signup', {title: '注册界面', flash: ctx.flash.get(), session: ctx.session})
  })
  .post('/signup', signup.signup)


export default router
