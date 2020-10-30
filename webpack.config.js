const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, 'src/landing/Home/less/antMotionStyle.less'),
    'utf8'
  )
);

const isDebug = !process.argv.includes('--release');
const isAnalyze = process.argv.includes('--analyze');
module.exports = {
  mode: isDebug ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, './src')]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      { test: /\.(png|PNG|jpg|JPG)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],
  optimization: {
    minimizer: isDebug
      ? []
      : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()]
  }
};
