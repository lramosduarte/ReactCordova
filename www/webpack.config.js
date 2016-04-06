var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./js/index.js",
  output: {
    path: __dirname,
    filename: "./build/bundle.js"
  },
  module: {
    loaders:
    [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
    ]
  }
};
