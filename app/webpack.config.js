/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';

const getFileName = (ext) => {
  return !dev ? `[name].[fullhash].${ext}` : `[name].${ext}`;
};

const optimization = () => {
  if (dev) {
    return { minimize: false };
  }

  return {
    minimize: true,
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  };
};

const getCssLoader = (preprocessor) => {
  const cssloader = [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: {
        hmr: dev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (preprocessor) {
    cssloader.push(preprocessor);
  }

  return cssloader;
};

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.ts'],
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    host: 'localhost',
    watchContentBase: true,
    port: 9000,
    hot: dev,
    // open: true,
    // openPage: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mentoring Homework',
      minify: {
        collapseWhitespace: !dev,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCSSExtractPlugin({
      filename: getFileName('css'),
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoader(),
      },
      {
        test: /\.scss$/,
        use: getCssLoader('sass-loader'),
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
};
