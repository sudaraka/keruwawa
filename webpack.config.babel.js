import 'webpack'
import { join } from 'path'

export default {
  'context': join(__dirname, 'src'),

  'entry': {
    'server.js': './server/cli.js'
  },

  'output': {
    'path': join(__dirname, 'dist'),
    'filename': '[name]'
  },

  'module': {
    'loaders': [
      { 'test': /\.js$/, 'exclude': /node_modules/, 'loader': 'babel' }
    ]
  },

  'externals': {
    'express': 'commonjs express'
  }
}
