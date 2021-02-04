const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'main.js'
  },
  resolve: {
    // enforceModuleExtension: false,
    extensions: ['.js', '.jsx']
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
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'), 
    watchContentBase: true, 
    port: 3030, 
    overlay: true,
  },
}
  