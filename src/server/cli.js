/**
 * src/server/cli.js: main executable script Express HTTP server
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

import express from 'express'

import appRoutes from './routes/app'

const
  app = express(),
  server = app.listen(
    process.env.KERUWAWA_HTTP_PORT || 5000,
    process.env.KERUWAWA_HTTP_HOST || '127.0.0.1'
  )

// --- HTTP Server event handlers ------------------------------------------ {{{

server.on('listening', () => {
  const
    addr = server.address()

  if('string' === typeof addr) {
    console.log(`Keruwawa API Server running: ${addr}`)
  }
  else {
    console.log(`Keruwawa API Server running: http://${addr.address}:${addr.port}`)
  }
})

server.on('error', error => {
  if('listen' === error.syscall) {
    if('EADDRINUSE' === error.code) {
      if(-1 === error.port) {
        console.error(`Socket ${error.address} already in use`)
      }
      else {
        console.error(`Port ${error.address}:${error.port} already in use`)
      }

      process.exit(1)
    }
    else if('EACCES' === error.code) {
      if(-1 === error.port) {
        console.error(`No permission to start server on unix://${error.address}`)
      }
      else {
        console.error(`No permission to start server on http://${error.address}:${error.port}/`)
      }

      process.exit(1)
    }
  }

  throw error
})

// ------------------------------------------------------------------------- }}}

app.set('x-powered-by', false)

// Routers
app.use('/', appRoutes)

// --- HTTP 404 handler ---------------------------------------------------- {{{
// IMPORTANT: this must be the last request handler.

app.use((req, res, next) => {
  res
    .status(404)
    .send('<h1>Not Found</h1>')
})

// --- HTTP Server event handlers ------------------------------------------ }}}
