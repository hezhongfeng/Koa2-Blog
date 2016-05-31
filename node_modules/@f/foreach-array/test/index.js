/**
 * Imports
 */

var forEach = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.plan(2)

  forEach(function (val, idx) {
    t.equal(val, 2)
    t.equal(idx, 0)
  }, [2])
})
