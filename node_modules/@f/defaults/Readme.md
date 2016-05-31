
# defaults

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Soft version of extend.  Assigns own properties only if they are undefined in the original object.

## Installation

    $ npm install @f/defaults

## Usage

```js
var defaults = require('@f/defaults')

defaults({a: 1}, {a: 2}) // => {a: 1}

defaults({a: 1}, {b: 2}) // => {a: 1, b: 2}
```

## API

### defaults(obj, defaults)

- `obj` - Object to extend with `defaults`
- `defaults` - Default values

**Returns:** `obj` with applied `defaults`.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/defaults.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/defaults
[git-image]: https://img.shields.io/github/tag/micro-js/defaults.svg
[git-url]: https://github.com/micro-js/defaults
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/defaults.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/defaults
