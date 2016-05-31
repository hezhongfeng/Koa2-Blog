
# foreach-array

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Iterate over an array

## Installation

    $ npm install @f/foreach-array

## Usage

```js
var forEach = require('@f/foreach-array')
forEach(cacheUser, [user1, user2, user3])
```

## API

### forEach(fn, arr)

- `fn(value, index)` - Function you want to call for each element of the array. Called with the same context as `forEach`.
- `arr` - The array you want to iterate over

**Returns:** void

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/foreach-array.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/foreach-array
[git-image]: https://img.shields.io/github/tag/micro-js/foreach-array.svg
[git-url]: https://github.com/micro-js/foreach-array
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/foreach-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/foreach-array
