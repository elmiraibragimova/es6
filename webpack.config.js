var path = require("path");

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
    }]
  },

  devServer: {
    contentBase: __dirname + '/build',
    hot: true
  }
};
