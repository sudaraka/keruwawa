/**
 * src/server/routes/app.js: route definition & handlers for the web app
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

import { Router } from 'express'

const
  route = Router()

route.get('/', (req, res) => {
  res.render('index')
})

export default route
