/**
 * Imports
 */

var isFunction = require('..')
var test = require('tape')

/**
 * Tests
 */

test('function is function', function (t) {
  t.ok(isFunction(function () {}))
  t.end()
})

test('empty is not function', function (t) {
  t.notOk(isFunction())
  t.end()
})

test('bool is not function', function (t) {
  t.notOk(isFunction(true))
  t.end()
})

test('object is not function', function (t) {
  t.notOk(isFunction({}))
  t.end()
})
