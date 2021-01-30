# raw-edit-loader

[![view on npm](http://img.shields.io/npm/v/raw-edit-loader.svg)](https://www.npmjs.com/package/raw-edit-loader)
[![npm module downloads per month](http://img.shields.io/npm/dm/raw-edit-loader.svg)](https://www.npmjs.org/package/raw-edit-loader)

A loader for webpack, **support modify source string**. Through the configuration of a series of properties, to modify the matching string

## usage

General configuration

```js
// src/index.js
console.log('Hello world!')
```

```js
// webpack.config.js
{
  test: /\.js$/,
  use: ['babel-loader', {
    loader: 'raw-edit-loader',
    options: {
      // pathList: [path.resolve(__dirname, './src/index.js')],
      pathReg: /src\/index.js/,
      replaceReg: /Hello/,
      replacement: 'Hi, ',
      done: function(source) {
        return source
      },
    }
  }],
}
```

Before passing in the next loader, the source will be modified to：

```js
// source string
console.log('Hi, wold!')
```

or group matching:

```js
// webpack.config.js
{
  test: /\.js$/,
  use: ['babel-loader', {
    loader: 'raw-edit-loader',
    options: {
      group: [
        {
          pathReg: /src\/index.js/,
          replaceReg: /Hello/,
          replacement: 'Hi, ',
          done: function(source) {
            return source
          },
        }
      ]
    }
  }],
}
```

### options

#### pathList [array]

Matching file absolute path list. If pathReg configured, the property will be invalid.

```
{
  pathList: ['/path/to/index.js', '/path/to/b.js']
}
```

#### pathReg [RegExp]

Matching file path regular expression. If pathList configured, the property will be invalid.

```js
{
  pathReg: /src\/index.js/,
}
```

#### replaceReg [RegExp]

Match the source string regular expression and the hit fragment will be replaced.

```js
{
  replaceReg: /Hello/,
}
```

#### replacement [string | Function]

Match the source string regular expression and the hit fragment will be replaced. `string.replace(replaceReg, replacement)`

```js
{
  replacement: 'Hi, ',
}
```

#### group [array]

If the matching group is configured, the single mode property will be invalid

```js
{
  group: [
    {
      pathReg: /src\/index.js/,
      replaceReg: /Hello/,
      replacement: 'Hi, ',
      done: function(source) {
        return source
      },
    },
    {
      pathReg: /src\/a.js/,
      replaceReg: /May/,
      replacement: 'Can',
      done: function(source) {
        return source
      },
    }
  ]
}
```

#### done [Function]

After the source operation is completed, the done method is called. Need return source.

```js
{
  done: function(source) {
    return `${source};console.log('hello world')`
  },
}
```
