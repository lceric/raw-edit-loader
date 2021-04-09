const path = require('path')

const rawEditLoaderOptions = () => ({
  pathReg: '\\/src/',
  replaceReg: 'import.meta.env.',
  regMode: 'g',
  replacement: 'process.env.',
  // done: function(data) {
  //   console.log(data);
  // },
})

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, './app.js')
  },
  output: {
    filename: '[name][hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, '../lib/index.js'),
            // loader: 'raw-edit-loader',
            options: rawEditLoaderOptions(),
          },
        ],
      },
    ],
  },
}
