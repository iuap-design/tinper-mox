var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * [exports description]
 * @type {Object}
 */
module.exports = {
  entry: {
    // 'polyfills': './src/polyfills.js',
    'vendor': '../src/vendorjs',
    'main': '../src/mainjs'
  },

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['js', '.js', '.json'],
    modules: [path.join(__dirname, '/src/..'), '/../node_modules']
  },

  module: {
    rules: [
      {
        test: /\js$/,
        exclude: [/\.(spec|e2e)\js$/],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    // new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
}
