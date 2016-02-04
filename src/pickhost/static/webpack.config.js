var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './assets/js/index'
  ],

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: "bundle.js"
//      path: path.resolve('./assets/bundles/'),
//      filename: "[name]-[hash].js",
//      publicPath: 'http://localhost:3000/assets/bundles/'
  },
  devServer: {
    contentBase: './dist'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [{
       test: /\.jsx?$/,
       exclude: /node_modules/,
    //   loader: 'babel-loader'
       loader: 'react-hot!babel'
     }, // to transform JSX into JS
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
