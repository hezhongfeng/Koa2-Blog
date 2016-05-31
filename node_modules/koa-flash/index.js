/**
 * Initialize flash middleware with `opts`
 *
 * - `key` session property name (default: koa-flash)
 * - `defaultValue` default value for this.flash (default: {})
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function (opts) {
  var opts = opts || {};
  var key = opts.key || 'koa-flash';
  var defaultValue = opts.defaultValue || {};

  return function *flash(next) {
    if (this.session === undefined) throw new Error('koa-flash requires the koa-session middleware.');

    var data = this.session[key] || defaultValue;

    delete this.session[key];

    Object.defineProperty(this, 'flash', {
      enumerable: true,
      get: function() {
        return data;
      },
      set: function(val) {
        this.session[key] = val;
      }
    });

    yield *next;

    if (this.status == 302 && this.session && !(this.session[key])) {
      this.session[key] = data;
    }
  };
};
