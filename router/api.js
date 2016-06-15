import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router
  .post('/test/', (ctx) => {
    console.log("到了api");
    console.log(ctx.request.body);
    //console.log(ctx.request.body.testdata);
    ctx.body = {
      test: 'json'
    }
  })

export default router
