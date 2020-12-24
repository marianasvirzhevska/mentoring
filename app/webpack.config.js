/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';
const apiUrl = 'http://localhost:5000';

const optimization = () => {
  if (!prod) {
    return { minimize: false };
  }

  return {
    minimize: true,
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  };
};

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@common': path.resolve(__dirname, 'src/components/common'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
          'sass-loader',
        ],
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules|__tests__/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    compress: prod,
    port: 4000,
    openPage: '',
    hot: true,
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
      },
    },
  },
  optimization: optimization(),
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,js}',
      },
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      template: path.join(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: prod,
      },
      filename: 'index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new ESLintPlugin(),
  ],
};
