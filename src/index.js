import mysql from 'mysql'

const
  conn = mysql.createConnection({
    'host': process.env.KERUWAWA_DB_HOST || 'localhost',
    'user': process.env.KERUWAWA_DB_USER || 'root',
    'password': process.env.KERUWAWA_DB_PASSWORD || '',
    'database': process.env.KERUWAWA_DB_NAME || 'timesheet',
  })

conn.connect()

conn.query('select * from clients', (err, result) => {
  console.log(JSON.stringify(result, null, 2))
})

conn.end()
