[![Build Status](https://travis-ci.org/shhhplus/mysql-promise.svg?branch=master)](https://travis-ci.org/shhhplus/mysql-promise)
[![Coverage Status](https://coveralls.io/repos/github/shhhplus/mysql-promise/badge.svg?branch=master)](https://coveralls.io/github/shhhplus/mysql-promise?branch=master)

## Introduction
this is a wrapper for [node-mysql](https://github.com/felixge/node-mysql) that wraps function calls with promise.you can use generator/yield or async/await with it.

## Install
`npm install mysql-pro`

## How to use
### init
```javascript
var Client = require("mysql-pro");
var client = new Client({
    mysql: {
        host: "127.0.0.1",
        port: 3306,
        database: "db",
        user: "root",
        password: "123456"
    }
});
```
### basic query
```javascript
client.query("select * from user where id = ?;", [1]).then(function(result) {
    // use result
}, function(error){
    // error
});
```

### transaction
```javascript
// start
client.startTransaction(function(result) {
    // execute sql
    client.executeTransaction("select * from user", []).then(function(result){
        // stop
        client.stopTransaction();
    }, function(error){});
}, function(error){
    // error
});
```

###  generator/yield
```javascript
function*() {
    yield client.startTransaction();
    yield client.executeTransaction("select * from user;", []);
    yield client.executeTransaction("update user set age = ? where id = ?;", [2, 1]);
    yield client.stopTransaction();
}
```

### async/await
```javascript
async function() {
    await client.startTransaction();
    await client.executeTransaction("select * from user;", []);
    await client.executeTransaction("update user set age = ? where id = ?;", [2, 1]);
    await client.executeTransaction("update user set name = ? where id = ?;", ['tom', 2]);
    await client.stopTransaction();
}
```
