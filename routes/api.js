import Router from 'koa-router'
const topic = require('../models/topic.js');
const user = require('../models/user.js');
const login = require('../controller/login.js');
const signup = require('../controller/signup');

const router = new Router({
  prefix: '/api'
})

router
  .post('/test/', (ctx) => {
    ctx.body = {
      test: 'json'
    }
  })

  .post('/getUserTopic', async(ctx) => {
    var topics = await topic.getByUserId(ctx.request.body.user_id,5);
    await ctx.render('updatePartials/userTopicsLink',{topics:topics});
  })
  
  .post('/getSignature', async(ctx) => {
    var topics = await user.get(ctx.request.body.email);
    await ctx.body('<div class=\"extra content\">');
  })

  .post('/login', login.login)

  .post('/signup', signup.signup)

export default router
