
# foreach

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Fast for each.

## Installation

    $ npm install @f/foreach

## Usage

```js
var foreach = require('@f/foreach')

var obj = {a: 1, b: 2}
var copy = {}

foreach(function (val, key) {
  copy[key] = val
})

copy // => {a: 1, b: 2}

```

## API

### foreach(fn, obj)

- `fn` - iterator
- `obj` - object to iterate over

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/foreach.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/foreach
[git-image]: https://img.shields.io/github/tag/micro-js/foreach.svg
[git-url]: https://github.com/micro-js/foreach
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/foreach.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/foreach
