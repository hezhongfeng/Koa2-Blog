import Koa from 'koa'
import Task from 'shell-task'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import Router from 'koa-router'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = err
    ctx.status = err.status || 500
  }
})

app.use(convert(bodyParser()))

const router = new Router()

router
  .get('/', async ctx => {
    ctx.body = 'This is deploy page!!!!'
  })
  .post('/github', async ctx => {
    new Task('pm2 stop run.js')
    .then('git pull')
    .then('npm i')
    .then('pm2 start run.js')
    .run(err => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = 'Deploy Done!'
        console.log('Deploy Done!')
      }
      return true
    })
  })

app.use(router.routes())

app.listen(process.env.PORT || 8080)
console.log(`Github Hook is running! On port ${process.env.PORT || 8080}!`);