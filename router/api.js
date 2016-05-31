import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router
  .get('/', (ctx, next) => {
  	console.log("到了api");
    ctx.body = "This is Api page"
  })

export default router
