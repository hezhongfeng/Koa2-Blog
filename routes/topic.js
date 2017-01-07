import Router from 'koa-router'
const topic = require('../controller/topic');


const router = new Router({
  prefix: '/topic'
})

router
  .get('/create', topic.getCreateTopic)

  /**
   * 这里需要注意的是不要把它放在前面，不然会被它优先捕获了，就没别人什么事了
   */
  .get('/:id', topic.readTopic)

  /**
   * 新建主题
   */
  .post('/create', topic.createTopic)

  /**
   * 新建回复
   */
  .post('/createReply', topic.createReply)

  /**
   * 点赞支持
   */
  .post('/addReplySupport', topic.addReplySupport)

  /**
   * 重新编辑主题
   */
  .post('/edit', topic.saveTopic)

export default router