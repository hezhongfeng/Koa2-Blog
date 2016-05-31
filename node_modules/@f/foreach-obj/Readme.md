
# foreach-obj

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Iterate over an object.

## Installation

    $ npm install @f/foreach-obj

## Usage

```js
var forEach = require('@f/foreach-obj')

forEach(function (value, key, index) {
  // do something
}, { a: 1, b: 2 })
```

## API

### forEach(fn, obj)

  * `fn(value, key, index)` - Function you want to call for each element of the object. Called with the same context as forEach.
  * obj - The object you want to iterate over

**Returns:** void

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/foreach-obj.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/foreach-obj
[git-image]: https://img.shields.io/github/tag/micro-js/foreach-obj.svg?style=flat-square
[git-url]: https://github.com/micro-js/foreach-obj
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/foreach-obj.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/foreach-obj
