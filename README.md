# imset

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> immutable updates that look mutable with template strings

## Install

```sh
npm i -S imset
```

## Usage

imset gives you a nice syntax for immutable updates. Unlike a deep clone, it
only clones objects as needed.

Let's start with a simple object.

```js
import imset from "imset"

var o = {
  x: {
    y: [1],
    z: 2,
  }
};
```

We can set a single property on it with an assignment operator. The operators `=`,
`+=`, `++`, and similar are supported.

```js
imset`${o}.x.z = 3`;
```

Any part of this expression can be dynamic.

```js
var key = 'x';
var value = 3;
imset`${o}.${key}.z = ${value}`;
```

We can also call methods, for example to manipulate arrays.

```js
imset`${o}.x.y.push(1, 2, 3)`
imset`${o}.x.y.splice(${index}, 1)`
```

That's all there is to it. Enjoy!

## License

MIT © [Frankie Bagnardi](https://github.com/brigand)

[npm-url]: https://npmjs.org/package/imset
[npm-image]: https://img.shields.io/npm/v/imset.svg?style=flat-square

[travis-url]: https://travis-ci.org/brigand/imset
[travis-image]: https://img.shields.io/travis/brigand/imset.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/brigand/imset
[coveralls-image]: https://img.shields.io/coveralls/brigand/imset.svg?style=flat-square

[depstat-url]: https://david-dm.org/brigand/imset
[depstat-image]: https://david-dm.org/brigand/imset.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/imset.svg?style=flat-square
