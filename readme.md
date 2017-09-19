# koa2-Blog

<p align="center">
  <a href="http://hezfblog.herokuapp.com">
    <img src="https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/icon.png">
  </a>
</p>

![issues](https://img.shields.io/github/issues/hezhongfeng/Koa2-Blog.svg)    ![stars](https://img.shields.io/github/stars/hezhongfeng/Koa2-Blog.svg)    ![forks](https://img.shields.io/github/forks/hezhongfeng/Koa2-Blog.svg)    ![juejin](https://badge.juejin.im/entry/587d8f4fb123db4d5e7e573d/likes.svg?style=flat-square)

- [线上体验](http://hezfblog.herokuapp.com/)
- 欢迎新建账号试用，有问题直接提issue,因为部署在heroku上面速度不会快

## 简要说明
1. 在学习Qt中QML的时候接触了JavaScript,后来知道可以用node做网站就有了一个想法，学习制作一个网站。公司的业务也是这方面的,自己独立制作会给我很大的帮助
2. 选择做什么类型网站的时候，选择做一个简单的博客类网站，模仿对象是[cnode](https://cnodejs.org/)
3. node框架选择的时候选择了Koa2，因为比较新，也有很多人说是未来的趋势

## 涉及到的技术问题
- 使用ES7的Async/Await,避免回调地狱
- 模板引擎使用的ejs,因为比较简单,html也不熟
- 数据库使用的mysql,ORM使用的sequelize
- 前端框架使用的Semantic UI

## 功能
1. 新建、登录账户
2. 账户基本信息设置,包括头像
3. 发表主题文章
4. 在文章下面回复，@别人进行回复，在别人回复下面直接回复
5. 积分、积分系统
6. 使用爬虫做的DOTA2比赛预告信息

## 我做的时候涉及到的问题点
1. 文件上传时寻找合适的 body 解析包，后来找到`koa-better-body`，其他的包可能是我没用明白
2. 前端UI框架使用的`Semantic UI`因为，`nswbmw`写的教程里面使用的它，当时还不知道别的UI框架
3. 写主题文章时想找比较好的markdown前端UI,最喜欢的是`segmentfault`上的，后来使用的`Houfeng`的[mditor](https://github.com/Houfeng/mditor)也挺不错的
4. 头像上传用的[cloudinary](http://cloudinary.com/),现在估计会使用七牛云了
5. 上传头像进行剪裁的库使用的[cropper](https://github.com/fengyuanchen/cropper)
6. 爬虫使用的是`cheerio`和`node-schedule`非常简单，这里爬的DOTA2的比赛时间表，同时为了防止heroku休眠，我把自己的网站给爬了，因为可以唤醒......
7. 实现at某用户时参考cnode的源码使用的atwho,然后后台读取数据时将@xx 替换成符合markdown的链接的格式 
8. heroku是个好东西，git远程更新完就自动运行，同时提供了mysql和很多别的数据库

## 感谢
1. 感谢[koa2-easy](https://github.com/Lxxyx/koa2-easy)这个框架，是在此基础上做的很多功能的添加
2. 感谢[nswbmw](https://github.com/nswbmw)大神的几个项目，我都学习了很多
3. 感谢[cnode](https://cnodejs.org/)网站，在上面问了很多问题，有很多好心人照顾我这个小白
4. 最后感谢各种包的作者，他们孜孜不倦的更新维护才能让我们拿来就用

## 截图
### 注册
![注册](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/signup.png)
### 登录
![登录](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/login.png)
### 首页
![首页](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/home.png)
### 发布文章页
![发布](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/createTopic.png)
### 查看文章页
![查看](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/topic.png)
### 未读消息
![消息](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/message.png)
### 设置
![设置](https://rawgit.com/hezhongfeng/Koa2-Blog/master/images/setting.png)
