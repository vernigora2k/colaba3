const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
  }

module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
             test: /\.js$/,
             loader: 'babel-loader',
             exclude: /node_modules/   
            },{
             test: /\.css$/i,
             use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },{
             test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
             loader: 'file-loader',
             options: {
                 name: '[name].[ext]'
                 }
            }
        ]
    },

    devServer: {
        overlay: true
    },

    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          //chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
          ])
      ]
}