const pg = require('pg')

const client = new pg.Client({
  connectionString: process.env.POSTGRES_URI,
  ssl: { rejectUnauthorized: false }
})

client.connect()

module.exports = client

