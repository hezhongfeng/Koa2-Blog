
# is-object

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Check if plain object.

## Installation

    $ npm install @f/is-object

## Usage

```js
var isObject = require('@f/is-object')

isObject({}) // true
isObject(function () {}) // false
isObject([]) // false
```

## API

### isObject(obj)

- `obj` - object to test

**Returns:** Boolean

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/is-object.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/is-object
[git-image]: https://img.shields.io/github/tag/micro-js/is-object.svg
[git-url]: https://github.com/micro-js/is-object
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/is-object.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/is-object
