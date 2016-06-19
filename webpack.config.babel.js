import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import merge from 'webpack-merge'

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
    }
  }

export default [
  // Server configuration
  merge(sharedConfig,
    {
      'target': 'node',
      'context': join(__dirname, 'src/server'),

      'entry': { 'server.js': './cli.js' },

      'node': { '__dirname': false },

      'externals': {
        'deep-assign': 'commonjs deep-assign',
        'express': 'commonjs express',
        'mysql': 'commonjs mysql',
        'yargs': 'commonjs yargs'
      }
    }
  ),

  // Client configuration
  merge(sharedConfig,
    {
      'context': join(__dirname, 'src/client'),

      'entry': { 'client.js': './index.js' },

      'plugins': [
        new HtmlWebpackPlugin({ 'template': join(__dirname, 'src/client/index.html') })
      ]
    }
  )
]
