const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: process.env.CI ? 'production' : 'development',
  entry: './src/js/app.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssImport(), postcssPresetEnv({ stage: 0 })],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            name: '[name].[contenthash]-[width].[ext]',
            format: 'webp',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        projects: require('./src/data/projects.json'),
        galleries: require('./src/data/galleries.json').sort(
          (a, b) => b.year - a.year,
        ),
      },
    }),
  ],
}
