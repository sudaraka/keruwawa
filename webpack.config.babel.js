import webpack from 'webpack'
import { join } from 'path'
import merge from 'webpack-merge'

import serverConfig from './webpack-config/server'
import clientConfig from './webpack-config/client'

const
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
  }

export default [
  // Server configuration
  merge(sharedConfig, serverConfig),

  // Client configuration
  merge(sharedConfig, clientConfig)
]
