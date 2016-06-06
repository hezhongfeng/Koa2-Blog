import Router from 'koa-router'

const router = new Router({
  prefix: '/user'
})

router
  .get('/', (ctx) => {
    console.log("user");
    ctx.body = "This is user page"
  })

export default router