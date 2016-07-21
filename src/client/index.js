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
      '252, 110, 81',
      '255, 206, 84',
      '160, 212, 104',
      '72, 207, 173',
      '160, 206, 203',
      '93, 156, 236',
      '172, 146, 236',
      '236, 135, 192',
      '186, 162, 134',
      '216, 51, 74',
      '46, 204, 113',
      '93, 156, 236',
      '128, 103, 183',
      '142, 130, 113',
      '237, 85, 101',
      '255, 206, 84',
      '79, 193, 233',
      '101, 109, 120'
    ]

  let
    totalHours = [],
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
          'yAxisID': 'y-axes-hours',
          'backgroundColor': `rgba(${color}, .8)`,
          'borderColor': 'rgba(0, 0, 0, 0)',
          'data': Array(thisWeek).fill(0)
        }
      }

      acc[project].data[week] = weekInfo[project] / (60 * 60)
    })

    return acc
  }, {})

  datasets = Object.values(datasets)

  datasets.sort((a, b) => {
    const
      sumA = a.data.reduce((acc, hours) => acc + hours),
      sumB = b.data.reduce((acc, hours) => acc + hours)

    return sumA - sumB
  })

  totalHours = datasets
    .reduce(
      (acc, project) => acc.map((v, i) => v + project.data[i]),
      Array(thisWeek).fill(0)
    )

  datasets.push({
    'label': 'Average',
    'borderWidth': 1,
    'pointRadius': 1,
    'pointBorderWidth': 4,
    'backgroundColor': 'rgba(0, 0, 0, 0)',
    'borderColor': 'rgba(242, 119, 122, 1)',
    'yAxisID': 'y-axes-avg',
    'data': totalHours
      .reduce((acc, hours) => {
        acc.push(hours + (acc[acc.length - 1] || 0))

        return acc
      }, [])
      .map((hours, i) => (hours / (i + 1)).toFixed(2))
  })

  new Chart(ctx, {  // eslint-disable-line no-new
    'type': 'line',
    'data': {
      labels,
      datasets
    },
    'options': {
      'title': {
        'display': true,
        'text': 'All Peojects Summary'
      },
      'legend': { 'position': 'bottom' },
      'elements': {
        'line': { 'borderWidth': 0 },
        'point': { 'radius': 0 }
      },
      'scales': {
        'xAxes': [ { 'gridLines': { 'display': false } } ],
        'yAxes': [ {
          'id': 'y-axes-hours',
          'ticks': {
            'beginAtZero': true,
            'min': 0,
            'max': Math.ceil(Math.max(...totalHours)),
            'stepSize': 2
          },
          'stacked': true
        }, {
          'id': 'y-axes-avg',
          'display': false,
          'ticks': {
            'beginAtZero': true,
            'min': 0,
            'max': Math.ceil(Math.max(...totalHours)),
            'stepSize': 2
          }
        } ]
      }
    }
  })
})
