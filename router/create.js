import Router from 'koa-router'
const topic = require('../controller/topic');


const router = new Router({
  prefix: '/create'
})

router
  .get('/',async(ctx) => {
    console.log('/create');
    await ctx.render('createTopic', {title: '发布界面', flash: ctx.flash.get(), session: ctx.session});
  });

export default router