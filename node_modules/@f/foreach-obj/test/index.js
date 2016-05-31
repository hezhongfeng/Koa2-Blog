/**
 * Imports
 */

var forEach = require('..')
var test = require('tape')

/**
 * Tests
 */

 test('one property', function (t) {
   t.plan(2)

   forEach(function (val, key) {
     t.equal(val, 2)
     t.equal(key, 'a')
   }, {a: 2})
 })

test('index', function (t) {
  t.plan(1)

  forEach(function (val, key, i) {
    t.equal(i, 0)  
  }, {a: 2})
})

test('multiple properties', function (t) {
  t.plan(3)

  forEach(function (val, key, i) {
    switch (key) {
      case 'a':
        t.equal(val, 3)
        break;
      case 'b':
        t.equal(val, 2)
        break;
      case 'c':
        t.equal(val, 1)
        break;
    }
  }, {
    a: 3,
    b: 2,
    c: 1
  })
})