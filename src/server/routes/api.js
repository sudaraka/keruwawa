/**
 * src/server/routes/api.js: API resource & end-point routes
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

import { Router } from 'express'

import { apiResponse } from '../utils'

const
  route = Router()

route.get('/', (req, res) => {
  res.json(apiResponse())
})

export default route
