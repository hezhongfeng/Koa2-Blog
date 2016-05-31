# shell-task

Proof-of-concept then-able shell commands in node. (Although it looks like a promise, it is NOT)

### Install
``` bash
$ npm install shell-task
```

### Usage
``` js
var Task = require('shell-task')

new Task('git init')
    .then('sleep 1000')
    .then('git add .')
    .then(function (next) {
        // you can mix JavaScript functions in between...
        console.log('doing something...')
        setTimeout(next, 1000)
    })
    .then('git commit -m "testing this cool stuff"')
    .then('git remote add ...')
    .then('git push -u origin master')
    .run(function (err, next) {
        // this entire callback is optional.
        if (err) {
            // you can ignore the exception
            // and just call next(), which will
            // continue the flow
        } else {
            console.log('done!')
        }
    })