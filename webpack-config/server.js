import { join } from 'path'

export default {
  'target': 'node',
  'context': join(__dirname, '../src/server'),

  'entry': { 'server.js': './cli.js' },

  'node': { '__dirname': false },

  'externals': {
    'deep-assign': 'commonjs deep-assign',
    'express': 'commonjs express',
    'moment': 'commonjs moment',
    'mysql': 'commonjs mysql',
    'yargs': 'commonjs yargs'
  }
}
