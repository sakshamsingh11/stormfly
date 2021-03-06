const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const sourceDirectory = path.resolve(__dirname, '../src')
const buildDirectory = path.resolve(__dirname, '../build')
const publicDirectory = path.resolve(__dirname, '../public')

const config = {
  entry: path.resolve(sourceDirectory, 'app.js'),

  output: {
    path: publicDirectory,
    filename: 'bundle-[name].[hash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourceDirectory,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      assets: path.resolve(sourceDirectory, 'assets'),
      constants: path.resolve(sourceDirectory, 'constants'),
      prefabs: path.resolve(sourceDirectory, 'prefabs'),
      scenes: path.resolve(sourceDirectory, 'scenes')
    }
  },

  devServer: {
    contentBase: buildDirectory,
    port: 31291
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      title: 'The Phaser App',
      template: sourceDirectory + '/index.html',
      filename: 'index.html' // relative to root of the application
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
}

module.exports = config