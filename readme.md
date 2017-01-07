# koa2-Blog
- [线上体验](http://hezfblog.herokuapp.com/)
## 简要说明
- 在学习QML的时候接触了JavaScript,后来知道可以用node做网站就有了一个想法，学习制作一个网站
- 选择做什么类型的时候，选择做一个简单的博客类网站，抄袭对象是[cnode](https://cnodejs.org/)
- node框架选择的时候选择了Koa2，因为比较新，也有很多人说是未来的趋势

## 涉及到的技术问题
- 使用ES7的Async/Await，避免回调地狱
- 模板引擎使用的ejs,因为比较简单
- 数据库的ORM使用的sequelize
- 前端框架使用的Semantic UI

## 功能
1. 新建账户
2. 账户基本信息设置包括头像
3. 发表主题
4. 发表回复
5. 积分系统
6. 点赞系统
7. 使用爬虫做的DOTA2比赛预告信息

## 数据库表结构
目前就这几个表

![图片](https://cdn.rawgit.com/hezhongfeng/Koa2-Blog/master/images/DB.svg)

## 感谢
1. 感谢[koa2-easy](https://github.com/Lxxyx/koa2-easy)这个框架，是在此基础上做的很多功能的添加
2. 感谢[nswbmw](https://github.com/nswbmw)大神的几个项目，我都学习了很多
3. 感谢[cnode](https://cnodejs.org/)网站，在上面问了很多问题，有很多好心人照顾我这个小白