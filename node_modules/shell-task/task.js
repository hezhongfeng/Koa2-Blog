var spawn = require('child_process').spawn

/**
 * Task constructor.
 *
 * @constructor
 * @param {String} cmd - initial command
 * @param {Object} [opts] - options to be passed to child
 *                          processes
 */

function Task (cmd, opts) {
  this.opts = opts || {
    stdio: 'inherit'
  }
  this.queue = []
  this.then(cmd)
}

/**
 * Queue an additional step.
 *
 * @param {String|Function} cmd
 * @return {Task}
 */

Task.prototype.then = function (cmd) {
  if (typeof cmd === 'string') {
    cmd = splitCmd(cmd)
  }
  this.queue.push(cmd)
  return this
}

/**
 * Run all the queued steps.
 *
 * @param {Function} [cb]
 */

Task.prototype.run = function (cb) {
  this.cb = cb || defaultCb
  run(this)
}

/**
 * The actual queue runner.
 *
 * @param {Task} task
 */

function run (task) {
  var step  = task.queue.shift()
  if (typeof step === 'function') {
    log('function: ' + (step.name || 'anonymous') + '()', 32)
    try {
      step(next)
    } catch (e) {
      handle(e)
    }
  } else {
    log(step.raw)
    if (isSleep(step)) {
      return setTimeout(next, +step.args[0])
    }
    var child = spawn(step.cmd, step.args, task.opts)
    child.once('error', handle)
    child.once('exit', next)
  }

  /**
   * Continue running the next task if no error.
   *
   * @param {Number} code - exit code of last task
   */
  function next (code) {
    if (typeof code === 'number' && code !== 0) {
      handle(new Error('process exited with unexpected code: ' + code))
    } else {
      if (task.queue.length) {
        run(task)
      } else {
        task.cb()
      }
    }
  }

  /**
   * Handle errors.
   *
   * @param {Error} err
   */

  function handle (err) {
    task.cb(err, next)
  }
}

/**
 * Split a command string into the command and a list of args.
 *
 * @param {String} cmd
 * @return {Object}
 */

function splitCmd (cmd) {
  var split = cmd.match(/(?:"[^"]*"|'[^']*'|[^\s"']+)+/g)
  return {
    cmd: split[0].trim(),
    args: split.slice(1).map(processArg),
    raw: cmd
  }
}

/**
 * Process a single argument, strip whitespaces and quotes
 *
 * @param {String} str
 * @return {String}
 */

function processArg (str) {
  str = str.trim()
  var a = str.charCodeAt(0)
  var b = str.charCodeAt(str.length - 1)
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}

/**
 * Check if the command is a sleep command...
 * If yes we just simulate it.
 *
 * @param {Object} step
 * @return {Boolean}
 */

function isSleep (step) {
  return step.cmd === 'sleep' &&
    step.args[0] == +step.args[0]
}

/**
 * The default callback if no callback if provided to run()
 *
 * @param {Error} [err]
 */

function defaultCb (err) {
  if (err) {
    log('Task failed.', 31)
    log(err.toString(), 31)
  } else {
    log('Task completed.', 32)
  }
}

/**
 * Colorful log utility.
 *
 * @param {String} str
 * @param {Number} colorCode
 */

function log (str, colorCode) {
  console.log('\x1B[' + (colorCode || 36) + 'm> ' + str + '\x1B[39m')
}

module.exports = Task