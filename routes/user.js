import Router from 'koa-router'
const topic = require('../controller/topic');


const router = new Router({
  prefix: '/user'
})

router
  .get('/:name',topic.getTopic);

export default router