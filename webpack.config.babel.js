import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'

export default [
  // Server configuration
  {
    'target': 'node',
    'context': join(__dirname, 'src/server'),

    'entry': { 'server.js': './cli.js' },

    'output': {
      'path': join(__dirname, 'dist'),
      'filename': '[name]'
    },

    'node': { '__dirname': false },

    'module': {
      'loaders': [
        {
          'test': /\.js$/,
          'exclude': /node_modules/,
          'loader': 'babel'
        }
      ]
    },

    'externals': {
      'deep-assign': 'commonjs deep-assign',
      'express': 'commonjs express',
      'mysql': 'commonjs mysql',
      'yargs': 'commonjs yargs'
    }
  },

  // Client configuration
  {
    'context': join(__dirname, 'src/client'),

    'entry': { 'client.js': './index.js' },

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
      new HtmlWebpackPlugin({
        'excludeChunks': [ 'server.js' ],
        'template': join(__dirname, 'src/client/index.html')
      })
    ]
  }
]
