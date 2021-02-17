// const path = require('path');
//
// const webpackConfig = {
//   mode: 'production',
//
//   context: __dirname,
//
//   entry: {
//     styles: ["./scss/color.scss"]
//   },
//
//   output: {
//     filename: "./css/style.compiled.js"
//   },
//
//   module: {
//     rules:
//     [
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'postcss-loader',
//           'sass-loader'
//         ]
//       }
//     ]
//   }
// };
//
// module.exports = webpackConfig;

/**
 * Build config for electron renderer process
 */

 const path = require('path');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const webpackConfig = {
  mode: 'production',

  entry: {
    styles: ["./scss/color.scss"]
  },

  output: {
    filename: "../node_modules/temp.js"
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // `./dist` can't be inerhited for publicPath for styles. Otherwise generated paths will be ./dist/dist
              publicPath: './',
            },
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer:
    [
      new CssMinimizerPlugin(),
    ]
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    })

  ]
};

module.exports = webpackConfig;
