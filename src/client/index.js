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
import Chart from 'chart.js'
import moment from 'moment'

axios.get('/api/weekly-hours/').then(res => {
  const
    ctx = document.querySelector('#mainCanvas'),
    thisWeek = parseInt(moment().format('w'), 10),
    labels = Array(thisWeek).fill(0).map((_, i) => i),
    thisYear = moment().format('Y'),
    data = res.data.payload,
    RGB = [
      '153, 204, 153',
      '102, 153, 204',
      '204, 153, 204',
      '102, 204, 204',
      '249, 145, 87',
      '210, 123,83',
      '255, 204, 102',
      '242, 119,122'
    ]

  let
    datasets

  if(!res.data && 200 !== res.status) {
    console.error(res.statusText)

    return
  }

  if(res.data.error) {
    console.error(res.data.message)

    return
  }

  datasets = labels.reduce((acc, week) => {
    const
      weekInfo = data[`${thisYear}-${week}`]

    if(!weekInfo) {
      return acc
    }

    Object.keys(weekInfo).forEach(project => {
      if(!acc[project]) {
        const
          color = RGB.shift()

        RGB.push(color)

        acc[project] = {
          'label': project,
          'backgroundColor': `rgba(${color}, 1)`,
          'borderColor': 'rgba(0, 0, 0, 0)',
          'borderWidth': 1,
          'pointRadius': 0,
          'data': []
        }
      }

      acc[project].data[week] = weekInfo[project] / (60 * 60)
    })

    return acc
  }, {})

  console.log(Object.values(datasets))

  datasets = Object.values(datasets)

  new Chart(ctx, {  // eslint-disable-line no-new
    'type': 'line',
    'data': {
      labels,
      datasets
    },
    'options': { 'scales': { 'yAxes': [ { 'stacked': true } ] } }
  })
})
