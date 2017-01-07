'use strict';
import Router from 'koa-router'
const login = require('../controller/login');
const signUp = require('../controller/signup');
const home = require('../controller/home');
const Upload = require('../controller/upload');
const userSetting = require('../controller/userSetting');
const Topic = require('../controller/topic');
const Admin = require('../controller/admin');
const Message = require('../controller/message')
const About = require('../controller/about')

const router = new Router()

router
/**
 * 主页
 */
  .get('/', home.getHome)

  /**
   * 登录页面
   */
  .get('/login', async(ctx) => {
    await ctx.render('login', {title: '登录界面', session: ctx.session});
  })

  /**
   * 登录的异步验证
   */
  .post('/login', login.login)

  /**
   * 注册页面
   */
  .get('/signup', async(ctx) => {
    await ctx.render('signup', {title: '注册界面', session: ctx.session})
  })

  /**
   * 注册的异步验证
   */
  .post('/signup', signUp.signUp)

  /**
   * 登出
   */
  .get('/logout', async(ctx) => {
    //删除session信息
    ctx.session = null;
    await ctx.redirect('/');
  })

  /**
   * 关于
   */
  .get('/about', About.getAbout)

  /**
   * 消息
   */
  .get('/message', Message.message)

  /**
   * 用户设置
   */
  .get('/userSetting/:name', userSetting.getUserSettingPage)

  /**
   * 上传头像
   */
  .post('/upload/Avatar', Upload.uploadAvatar)

  /**
   * 编辑主题
   */
  .get('/topic/:topicId/edit', Topic.editTopic)

  /**
   * 后台管理
   */
  .get('/admin', Admin.manage)

  .get('/admin/login', Admin.login)

  .post('/admin/login', Admin.loginPost)

  .get('/admin/logout', Admin.logout)

export default router
