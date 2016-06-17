import Router from 'koa-router'
const topic = require('../controller/topic');


const router = new Router({
  prefix: '/topic'
})

router
  .get('/:id',topic.readTopic)

export default router