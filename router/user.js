import Router from 'koa-router'

const router = new Router({
  prefix: '/user'
})

router
  .get('/', async(ctx) => {
    await ctx.render('user', {title: '个人主页', flash: ctx.flash.get(),session:ctx.session});
  })

export default router