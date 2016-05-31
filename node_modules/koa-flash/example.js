var koa = require('koa')
  , session = require('koa-session')
  , flash = require('koa-flash');

var app = koa();

app.keys = ['foo'];
app.use(session());
app.use(flash());

app.use(function *() {
  if (this.method === 'POST') {
    this.flash = { error: 'This is a flash error message.' };
  } else if (this.method === 'GET') {
    this.body = this.flash.error || 'No flash data.';
  }
});

app.listen(3000);
