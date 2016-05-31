
# is-array

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Functional version of Array.isArray

## Installation

    $ npm install @f/is-array

## Usage

```js
var isArray = require('@f/is-array')

isArray([]) === true
isArray({}) === false
```

## API

### isArray(val)

- `val` - An arbitrary value that may or may not be an array.

**Returns:** A boolean value indicating whether or not `val` is an array.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/is-array.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/is-array
[git-image]: https://img.shields.io/github/tag/micro-js/is-array.svg
[git-url]: https://github.com/micro-js/is-array
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/is-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/is-array
