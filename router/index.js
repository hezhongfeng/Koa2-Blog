import Router from 'koa-router'
const login = require('../controller/login.js');

const router = new Router()

router
//get
  .get('/', async(ctx, next) => {
    // 渲染模板
    console.log("渲染模板");
    await ctx.render('index', {title: 'Koa2-Easy' + ctx.path})
    //throw new ctx.Err({ message: '用户已存在', status: 400})
  })
  .get('/hezf', async(ctx, next) => {
    // 使用模板，建立主页
    await ctx.render('hezf', {title: 'Hezf'})
    await ctx.send(ctx,'demo.html', {root: 'static/statics'});
  })
  .get('/index', async(ctx, next) => {
    // 发送静态文件
    await ctx.send(ctx, 'demo.html', {root: 'static/statics'})
  })
  .get('/login', async(ctx, next) => {
    // 发送静态文件
    await ctx.render('login0', {title: '登录界面'})
  })
  .get('/reg', async(ctx, next) => {
    // 发送静态文件
    await ctx.render('reg', {title: '注册界面'})
  })

  .post('/login', login.postLogin);

//post
//.post('/reg',login.postLogin);
// .post('/reg', async(ctx, next) => {
//   var name = ctx.request.body.name;
//   var password = ctx.request.body.password;
//   var password_re = ctx.request.body['password-repeat'];
//   var email = ctx.request.body.email;
//
//   //检验用户两次输入的密码是否一致
//   if (password_re != password) {
//     console.log('error,两次输入的密码不一致!');
//     return ctx.render('reg', {title: '注册界面'})
//   }
//   //生成密码的md5值,以后都需要根据这个值比较，以后的处理应该不放在这里~
//   var md5 = crypto.createHash('md5');
//   var password = md5.update(ctx.request.body.password).digest('hex');
//
//   await client.startTransaction();
//   let msg;
//   try {
//     msg = await client.executeTransaction("INSERT INTO test ( name, password,email )VALUES( ?, ?,? );",[name,password,email]);
//   }
//   catch(err) {
//     err.status = err.statusCode || err.status || 500;
//     throw err;
//   }
//   await client.stopTransaction();
//
//   console.log(msg);
//   await ctx.render('hezf', {title: '主页'})
// })

export default router
