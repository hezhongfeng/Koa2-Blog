/**
 * Imports
 */

var isArray = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.ok(isArray([]))
  t.ok(!isArray({}))
  t.end()
})
