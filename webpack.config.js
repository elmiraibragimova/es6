
module.exports = {
  entry: './src/main.js',

  output: {
    path: __dirname + './build',
    filename: './js/main.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: __dirname + './src',
      loader: 'babel?preset[]=es2015'
    }]
  },

  devServer: {
    contentBase: __dirname + '/build',
    hot: true
  }
};
