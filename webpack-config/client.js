import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import pkg from '../package'

export default {
  'context': join(__dirname, '../src/client'),

  'entry': { 'client.js': './index.js' },

  'plugins': [
    new HtmlWebpackPlugin({
      'template': join(__dirname, '../src/client/index.html'),
      'version': pkg.version
    })
  ]
}
