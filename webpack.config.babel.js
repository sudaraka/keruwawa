import 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'

export default {
  'target': 'node',
  'context': join(__dirname, 'src'),

  'entry': { 'server.js': './server/cli.js' },

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
  },

  'plugins': [
    new HtmlWebpackPlugin({
      'excludeChunks': [ 'server.js' ],
      'template': join(__dirname, 'src/client/index.html')
    })
  ]
}
