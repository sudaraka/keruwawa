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
  if(err) {
    console.error('Database connection error: ', err)

    return
  }

  conn.query(WEEKLY_ALL, (err, result) => {
    if(err) {
      console.error('Query failed: ', err)

      conn.end()
      return
    }

    console.log(JSON.stringify(result, null, 2))

    conn.end()
  })

})

