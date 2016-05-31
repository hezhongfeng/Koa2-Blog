
# is-function

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Test whether a given value is a function.

## Installation

    $ npm install @f/is-function

## Usage

```js
var isFunction = require('@f/is-function')

isFunction() // => false
isFunction(true) // => false
isFunction({}) // => false
isFunction(function () {}) // => true
```

## API

### isFunction(value)

- `value` - value to test

**Returns:** boolean

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/is-function.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/is-function
[git-image]: https://img.shields.io/github/tag/micro-js/is-function.svg
[git-url]: https://github.com/micro-js/is-function
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/is-function.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/is-function
