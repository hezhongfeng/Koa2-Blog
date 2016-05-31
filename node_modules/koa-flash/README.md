#koa-flash

Flash messages for your [koa](https://github.com/koajs/koa) application.

[![Build Status](https://travis-ci.org/rickharrison/koa-flash.svg?branch=master)](https://travis-ci.org/rickharrison/koa-flash)

## Installation

```js
$ npm install koa-flash
```

koa-flash also depends on [koa-session](https://github.com/koajs/session). You must add koa-session as a middleware prior to adding koa-flash as seen in the example:

## Example

```js
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
```

## Semantics

Flash data when set will be saved to the user's session for exactly one more request. You can save any javascript object into `this.flash` (Object, Number, String, etc.). A common use case is to save an error message from a `POST` request when redirecting to a `GET` request to display the form again.

## Options

Flash data is saved into `this.session['koa-flash']` by default. You can change this by passing in a `key` option.

```js
app.use(flash({ key: 'foo' }));
```

Also, you can set `defaultValue` instead of `{}`.

```js
app.use(flash({ defaultValue: 'bar' }));
```

## License

MIT
