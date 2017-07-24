var path = require('path')
var webpack = require('webpack')
var mode = require('yargs').argv.mode
var uglifyPlugin = webpack.optimize.UglifyJsPlugin

var libraryName = 'Mox'
var plugins = []
var filename = ''

// 生产环境
if(mode === 'production'){
  filename = libraryName + '.min.js'
}
// 开发环境
else {
  filename = libraryName + '.js'
}

plugins.push(new uglifyPlugin({minimize: true}))

var config = {

  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: filename,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  "devtool": "cheap-source-map",

  resolve: {
    extensions: ['.js', '.css', '.json']

  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: plugins
}

module.exports = config
