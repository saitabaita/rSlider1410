'use strict'
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
//const PAGES_DIR = path.join(__dirname, 'src')

module.exports = {
  entry: {
      app: "./index"
  },
  output: {
      filename: "[name].js",
      path: path.join(__dirname, 'dist'),
      publicPath: ''
  },
  optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /node_modules/,
              chunks: 'all',
              enforce: true
            }
          }
        }
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.ts$/,
              loader:{
                loader: 'awesome-typescript-loader',
                options: {
                  presets:[
                    '@babel/preset-env',
                    '@babel/preset-typescript'
                  ],
                  plugins: [
                    '@babel/plugin-proposal-class-properties'
                  ],
                  sourceType: "script"
                }
              },
              exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: { sourceMap: true }
                    }, {
                      loader: 'postcss-loader',
                      options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }
                 ]
            },
            {
                test: /\.html$/,
                use: [
                  "htmllint-loader",
                  {
                    loader: "html-loader",
                    options: {
                    }
                  }
                ]
            }
        ]
    },
  devtool: "source-map",
  devServer: {
      overlay: {
        warnings: true,
        errors: true
      },
      port: 8083,
  },
  resolve: {
      //где искать модули
      modules: [
          "node_modules",
          path.resolve(__dirname, "src")
      ],
      extensions: [".js", ".ts", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/jquery/dist/jquery.min.js', to: 'jquery.min.js' },
        //{ from: 'src/libs/rsSlider1410.css', to: 'rsSlider1410.css' }
      ]
    }),
    new webpack.ProvidePlugin({
      "$":"jquery",
      "jQuery":"jquery",
      "window.jQuery":"jquery"
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
      }
    )
  ]
}