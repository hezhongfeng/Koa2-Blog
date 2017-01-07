import Router from 'koa-router'
const User = require('../controller/user');
const userSetting = require('../controller/userSetting');

const router = new Router({
  prefix: '/user'
})

router

/**
 * 这里也需要注意，不能把它放在前面
 */
  .get('/:name', User.getUserPage)

  .get('/:name/replies', User.getUserRepliesPage)

  .get('/:name/topics', User.getUserTopicsPage)

  //设置基础信息
  .post('/saveBasicInfo', userSetting.saveBasicInfo)

  //重新设置用户密码
  .post('/updatePassword', userSetting.updatePassword)

export default router