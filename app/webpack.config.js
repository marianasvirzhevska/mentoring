const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

const getFileName = (ext) => {
  return prod ?
    `[name].[hash].${ext}` :
    `[name].${ext}`
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    },
  }

  if (prod) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const getCssLoader = (preprocessor) => {
  const cssloader = [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: {
        hmr: !prod,
        reloadAll: true
      }
    },
    'css-loader'
  ]

  if (preprocessor) {
    cssloader.push(preprocessor);
  }

  return cssloader;
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [ '@babel/polyfill', './index.ts' ]
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.js', '.json', '.ts' ],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: !prod
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: prod
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCSSExtractPlugin({
      filename: getFileName('css')
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoader()
      },
      {
        test: /\.scss$/,
        use: getCssLoader('sass-loader')
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          { loader: 'url-loader' }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  }
}