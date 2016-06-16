import Router from 'koa-router'
const topic = require('../models/topic.js');

const router = new Router({
  prefix: '/api'
})

router
  .post('/test/', (ctx) => {
    console.log("到了api");
    console.log(ctx.request.body);
    ctx.body = {
      test: 'json'
    }
  })

  .post('/getUserTopic', async(ctx) => {
    console.log("到了api");
    console.log(ctx.request.body);
    var topics = await topic.getByUserId(ctx.request.body.user_id,5);
    await ctx.render('updatePartials/userTopicsLink',{topics:topics});
  })

export default router
