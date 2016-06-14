/**
 * src/config/index.js: configuration provider for the web server
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

/* eslint-disable no-process-env */

import { readFileSync } from 'fs'
import yargs from 'yargs'
import deepAssign from 'deep-assign'

const
  DEFAULT_CONFIG = {
    'http': {
      'host': process.env.KERUWAWA_HTTP_HOST || '127.0.0.1',
      'port': process.env.KERUWAWA_HTTP_PORT || 5000
    },
    'db': {
      'host': '127.0.0.1',
      'user': 'root',
      'password': '',
      'database': 'timesheet'
    }
  },

  argv = yargs
    .alias('c', 'configfile')
    .argv

let
  fileConfig = {}

if(argv.configfile) {
  try {
    fileConfig = JSON.parse(readFileSync(argv.configfile, 'utf8'))
  }
  catch(e) { /* noop */ }
}

export default deepAssign({}, DEFAULT_CONFIG, fileConfig)
