const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  }
};
