import mysql from 'mysql'

import { WEEKLY_ALL } from './sql'

const
  conn = mysql.createConnection({
    'host': process.env.KERUWAWA_DB_HOST || 'localhost',
    'user': process.env.KERUWAWA_DB_USER || 'root',
    'password': process.env.KERUWAWA_DB_PASSWORD || '',
    'database': process.env.KERUWAWA_DB_NAME || 'timesheet',
  })

conn.connect()

conn.query(WEEKLY_ALL, (err, result) => {
  console.log(JSON.stringify(result, null, 2))
})

conn.end()
