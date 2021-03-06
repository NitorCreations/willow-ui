var path = require('path');
var webpack = require('webpack');

// sass-loader needs this
require('es6-promise').polyfill();

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/ui/__webpack_hmr', // WebpackDevServer host and port
    'babel-polyfill',
    './ui/js/willow-main'
  ],
  output: {
    publicPath: '/ui/',
    path: path.join(__dirname, '/dist/js'),
    filename: 'willow-main.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'ui/js']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        loaders: [
          'react-hot',
          'babel?' + JSON.stringify({
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react']
          })
        ],

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "ui"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  debug: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
