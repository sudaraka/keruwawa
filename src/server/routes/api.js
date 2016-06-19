/**
 * src/server/routes/api.js: API resource & end-point routes
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { Router } from 'express'
import { format } from 'mysql'

import { apiResponse, errResponse } from '../utils'
import { WEEKLY_ALL } from '../sql'

const
  route = Router()  // eslint-disable-line new-cap

route.get('/weekly-hours/', (req, res) => {
  const
    db = req.app.get('db'),
    sql = format(WEEKLY_ALL, [ [ 2016 ] ])

  db.query(sql, (err, data) => {
    if(err) {
      res.json(errResponse(err))
    }
    else {
      const
        payload = data

      res.json(apiResponse({ payload }))
    }
  })

})

export default route
