/**
 * Imports
 */

var forEach = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should iterate over object', function (t) {
  var obj = {1: 1, 2: 2, 3: 3}
  var clone = {}

  forEach(function (val, key) {
    clone[key] = val
  }, obj)

  t.deepEqual(obj, clone)
  t.end()
})

test('should iterate over array', function (t) {
  t.plan(2)

  forEach(function (val, idx) {
    t.equal(val, 2)
    t.equal(idx, 0)
  }, [2])
})
