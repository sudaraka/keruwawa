import mysql from 'mysql'

import { WEEKLY_ALL } from './sql'

const
  conn = mysql.createConnection({
    'host': process.env.KERUWAWA_DB_HOST || 'localhost',
    'user': process.env.KERUWAWA_DB_USER || 'root',
    'password': process.env.KERUWAWA_DB_PASSWORD || '',
    'database': process.env.KERUWAWA_DB_NAME || 'timesheet',
  })

conn.connect(err => {
  let
    sql

  if(err) {
    console.error('Database connection error: ', err)

    return
  }

  sql = mysql.format(WEEKLY_ALL, [[ 2011, 2012, 2013, 2014, 2015 ]])
  console.log(sql)

  conn.query(sql, (err, result) => {
    if(err) {
      console.error('Query failed: ', err)

      conn.end()
      return
    }

    console.log(JSON.stringify(result, null, 2))

    conn.end()
  })

})

