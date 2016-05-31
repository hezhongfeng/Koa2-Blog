/**
 * Imports
 */

var defaults = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.equal(defaults({a: 1}, {a: 2}).a, 1)
  t.equal(defaults({a: 1}, {b: 2}).b, 2)
  t.end()
})
