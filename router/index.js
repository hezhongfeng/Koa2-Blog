import Router from 'koa-router'
const login = require('../controller/login');
const signup = require('../controller/signup');
const topic = require('../controller/topic');

const router = new Router()

router

/**
 * 主页
 */
  .get('/', topic.getTopic)

  /**
   * 登出
   */
  .get('/logout', async(ctx) => {
    //删除session信息
    ctx.session = null;
    await ctx.redirect('/');
  })

  /**
   * 登录页面
   */
  .get('/login', async(ctx) => {
    await ctx.render('login', {title: '登录界面', flash: ctx.flash.get(), session: ctx.session});
  })
  .post('/login', login.login)

  /**
   * 注册页面
   */
  .get('/signup', async(ctx) => {
    await ctx.render('signup', {title: '注册界面', flash: ctx.flash.get(), session: ctx.session})
  })
  .post('/signup', signup.signup)


export default router
