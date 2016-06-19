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
  const
    appDiv = document.querySelector('#app'),
    tbl = document.createElement('table'),
    thead = document.createElement('thead'),
    tbody = document.createElement('tbody'),
    trh = document.createElement('tr'),
    weekList = Array(54).fill(0).map((_, i) => i),
    data = res.data.payload

  let
    th

  appDiv.innerHTML = null

  if(!res.data && 200 !== res.status) {
    console.error(res.statusText)

    return
  }

  if(res.data.error) {
    console.error(res.data.message)

    return
  }

  th = document.createElement('th')
  th.textContent = 'Week'
  trh.appendChild(th)

  th = document.createElement('th')
  th.textContent = 'Projects'
  trh.appendChild(th)

  th = document.createElement('th')
  th.textContent = 'Hours'
  trh.appendChild(th)

  thead.appendChild(trh)

  weekList
    .forEach(week => {
      const
        tr = document.createElement('tr'),
        key = `2016-${week}`

      let
        td

      td = document.createElement('td')
      td.textContent = week
      tr.appendChild(td)

      td = document.createElement('td')
      td.textContent = Object.keys(data[key] || []).join(', ')
      tr.appendChild(td)

      td = document.createElement('td')
      td.textContent = (Object.values(data[key] || []).reduce((a, v) => a + v, 0) / (60 * 60)).toFixed(2)
      tr.appendChild(td)

      tbody.appendChild(tr)
    })

  tbl.className = 'table'
  tbl.appendChild(thead)
  tbl.appendChild(tbody)

  appDiv.appendChild(tbl)
})
