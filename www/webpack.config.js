var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "bootstrap-webpack!./bootstrap.config.js",
    "./index.js"
  ],
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
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /.woff2?(\?v=\d+.\d+.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
