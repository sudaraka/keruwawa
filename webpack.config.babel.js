import 'webpack'
import { join } from 'path'

export default {
  'target': 'node',
  'context': join(__dirname, 'src'),

  'entry': { 'server.js': './server/cli.js' },

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

  'externals': {
    'deep-assign': 'commonjs deep-assign',
    'express': 'commonjs express',
    'mysql': 'commonjs mysql',
    'yargs': 'commonjs yargs'
  }
}
