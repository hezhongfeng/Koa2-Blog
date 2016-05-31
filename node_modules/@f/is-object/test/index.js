/**
 * Imports
 */

var isObject = require('..')
var test = require('tape')
var vm = require('vm')

/**
 * Tests
 */

test('object is object', function (t) {
  t.equal(isObject({}), true)
  t.end()
})

test('instance is not object', function (t) {
  t.equal(isObject(new Cls()), false)
  t.end()

  function Cls () {}
})

test('empty is not object', function (t) {
  t.equal(isObject(), false)
  t.end()
})

test('array is not object', function (t) {
  t.equal(isObject([]), false)
  t.end()
})

test('redux texts', function (t) {
  function Test() {
    this.prop = 1
  }

  var sandbox = {fromAnotherRealm: false}
  vm.runInNewContext('fromAnotherRealm = {}', sandbox)

  t.ok(isObject(sandbox.fromAnotherRealm))
  t.notOk(isObject(new Test()))
  t.notOk(isObject(new Date()))
  t.notOk(isObject([1, 2, 3]))
  t.notOk(isObject(null))
  t.notOk(isObject())
  t.ok(isObject({ 'x': 1, 'y': 2 }))

  t.end()
})
