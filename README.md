# babel-plugin-transform-sprockets-require
[![Build Status](https://travis-ci.org/maur8ino/babel-plugin-transform-sprockets-require.svg?branch=master)](https://travis-ci.org/maur8ino/babel-plugin-transform-sprockets-require)
[![bitHound Overall Score](https://www.bithound.io/github/maur8ino/babel-plugin-transform-sprockets-require/badges/score.svg)](https://www.bithound.io/github/maur8ino/babel-plugin-transform-sprockets-require)
[![bitHound Code](https://www.bithound.io/github/maur8ino/babel-plugin-transform-sprockets-require/badges/code.svg)](https://www.bithound.io/github/maur8ino/babel-plugin-transform-sprockets-require)
### What is it?

Babel plugin to transform sprockets'

```javascript
//= require something
```

into

```javascript
require("something");
```

## Usage

Add `transform-sprockets-require` to your `.babelrc` or `"babel"` key into your `package.json`.

`.babelrc`:

```javascript
{
  "plugins": ["transform-sprockets-require"]
}
```

`package.json`:

```javascript
{
  ...
  "babel": {
    "plugins": ["transform-sprockets-require"]
  }
  ...
}
```

You can optionally pass an array of blacklisted modules as `blacklist` option.

`.babelrc`:

```javascript
{
  "plugins": [
    ["transform-sprockets-require", {
      blacklist: [
        "jquery_ujs",
        /backbone/
      ]
    }]
   ]
}
```

`package.json`:

```javascript
{
  ...
  "babel": {
    "plugins": [
      ["transform-sprockets-require", {
        blacklist: [
          "jquery_ujs",
          /backbone/
        ]
      }]
    ]
  }
  ...
}
```

## License

(The MIT License)

Copyright (c) 2016 Mauro Verrocchio.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
