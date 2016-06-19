/**
 * src/client/index.js: main module for client-side bundle
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import axios from 'axios'

axios.get('/api/weekly-hours/').then(res => {
  if(!res.data && 200 !== res.status) {
    console.error(res.statusText)

    return
  }

  if(res.data.error) {
    console.error(res.data.message)

    return
  }

  console.log(res.data.payload)
})
