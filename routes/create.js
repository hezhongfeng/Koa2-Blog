import Router from 'koa-router'
const create = require('../controller/create');


const router = new Router({
  prefix: '/create'
})

router
  .get('/', async(ctx) => {
    console.log(ctx.session.user.user_id);
    var position = 'create';
    await ctx.render('create', {title: '发布界面', flash: ctx.flash.get(), session: ctx.session, position: position});
  })

  .post('/', create.post)

export default router