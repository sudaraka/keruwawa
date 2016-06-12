import mysql from 'mysql'

import { WEEKLY_ALL } from './sql'

const
  conn = mysql.createConnection()
  //   'host': process.env.KERUWAWA_DB_HOST || 'localhost',
  //   'user': process.env.KERUWAWA_DB_USER || 'root',
  //   'password': process.env.KERUWAWA_DB_PASSWORD || '',
  //   'database': process.env.KERUWAWA_DB_NAME || 'timesheet'
  // })

conn.connect(errConnect => {
  if(errConnect) {
    console.error('Database connection error: ', errConnect)

    return
  }

  const
    sql = mysql.format(WEEKLY_ALL, [ [ 2011, 2012, 2013, 2014, 2015 ] ])

  console.log(sql)

  conn.query(sql, (errQuery, result) => {
    if(errQuery) {
      console.error('Query failed: ', errQuery)

      conn.end()

      return
    }

    console.log(JSON.stringify(result, null, 2))

    conn.end()
  })

})

