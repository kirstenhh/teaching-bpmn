const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'modeler.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    https: true,
    open: ['/index.html?articleid=1'],
  },
  module: {
    rules: [
      {
        test: /\.bpmnlintrc$/,
        use: ['bpmnlint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    alias: {
      fs: 'pdfkit/js/virtual-fs.js'
    }
  }
};