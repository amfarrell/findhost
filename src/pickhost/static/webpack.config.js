var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './assets/js/index.jsx'
  ],

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
      publicPath: 'http://localhost:3000/assets/bundles/'
  },
  devServer: {
    contentBase: './fixture',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
  ],

  module: {
    loaders: [{
       // transform JSX -> JS
       test: /\.jsx?$/,
       exclude: /node_modules/,
       loader: 'react-hot!babel'
     }, {
        test: require.resolve("jquery"),
        loader: "imports?jQuery=jquery"
     }
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
