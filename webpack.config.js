const webpack = require('webpack')
const path = require('path')
const config = require('sapper/config/webpack.js')
const sass = require('svelte-preprocess-sass')
const sapperEnv = require('sapper-environment')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const pkg = require('./package.json');

const RISE_DEFAULT_CHANNEL = process.env.RISE_DEFAULT_CHANNEL;
const RISE_API_PUBLIC = process.env.RISE_API_PUBLIC;
const SITE_URL = process.env.SITE_URL;
const API_URL = process.env.API_URL;
const GATEWAY_UUID = process.env.GATEWAY_UUID;
const GATEWAY_PUBLIC = process.env.GATEWAY_PUBLIC;

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const webpackMode = mode === 'production' ? 'production' : 'development'

const alias = {svelte: path.resolve('node_modules', 'svelte')};
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: {alias, extensions, mainFields},
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              hydratable: true,
              hotReload: true, // pending https://github.com/sveltejs/svelte/issues/2377
              preprocess: require('svelte-preprocess')({
                style: sass.sass({
                }, {
                  all: true,
                  includePaths: ['src', 'node_modules']
                }),
                typescript: {
                  // skips type checking
                  transpileOnly: true,
                  // compilerOptions: {
                  //   ...
                  // },
                },
              })
              // style: sass.sass({},  { all: true })
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    './src/theme',
                    './node_modules'
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    mode,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }),
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        ...sapperEnv(),
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.API_URL': JSON.stringify(API_URL),
        'process.env.SITE_URL': JSON.stringify(SITE_URL),
        'process.env.GATEWAY_UUID': JSON.stringify(GATEWAY_UUID),
        'process.env.GATEWAY_PUBLIC': JSON.stringify(GATEWAY_PUBLIC),
        'process.env.RISE_API_PUBLIC': JSON.stringify(RISE_API_PUBLIC),
        'process.env.RISE_DEFAULT_CHANNEL': JSON.stringify(RISE_DEFAULT_CHANNEL)
      }),
    ].filter(Boolean),
    devtool: dev && 'inline-source-map'
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: {alias, extensions, mainFields},
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              css: false,
              generate: 'ssr',
              dev,
              preprocess: {
                style: sass.sass({},  {
                  all: true,
                  includePaths: [
                    'src',
                    'node_modules'
                  ]
                }),
                typescript: {
                  // skips type checking
                  transpileOnly: true,
                  // compilerOptions: {
                  //   ...
                  // },
                },
              },
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    './src/theme',
                    './node_modules'
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    mode: process.env.NODE_ENV,
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }),
    ].filter(Boolean),
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
