const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
        options: {
          name: '/images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      SECRET_KEY: null
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/public'), 
    watchContentBase: true, 
    port: 3030, 
    overlay: true,
  },
}
  