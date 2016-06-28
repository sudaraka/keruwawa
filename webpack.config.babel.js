import webpack from 'webpack'
import { join } from 'path'
import merge from 'webpack-merge'
import yargs from 'yargs'

import serverConfig from './webpack-config/server'
import clientConfig from './webpack-config/client'

const
  isProduction = yargs.argv.production,

  sharedConfig = {
    'output': {
      'path': join(__dirname, 'dist'),
      'filename': '[name]'
    },

    'module': {
      'loaders': [
        {
          'test': /\.js$/,
          'exclude': /node_modules/,
          'loader': 'babel'
        }
      ]
    },

    'plugins': [
      // Exclude moment.js locale from the build
      new webpack.IgnorePlugin(/locale/, /moment$/)
    ]
  },

  productionConfig = isProduction ? {
    'plugins': [
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        'minimize': true,
        'compressor': { 'warnings': false }
      })
    ]
  } : {}

export default [
  // Server configuration
  merge(sharedConfig, productionConfig, serverConfig),

  // Client configuration
  merge(sharedConfig, productionConfig, clientConfig)
]
