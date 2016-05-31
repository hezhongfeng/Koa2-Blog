/**
 * Imports
 */

var forEach = require('@f/foreach')

/**
 * defaults
 */

function defaults (obj, def) {
  forEach(maybeSetProp, def)
  return obj

  function maybeSetProp (val, key) {
    if (obj[key] === undefined) {
      obj[key] = val
    }
  }
}

/**
 * Exports
 */

module.exports = defaults
