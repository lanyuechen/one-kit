const path = require('path');

module.exports = {
  entry: {
    index: './src/mapping/model.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'mapping.min.js',
    library: 'Mapping',
    libraryTarget: 'umd'
  },
  plugins: [

  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
