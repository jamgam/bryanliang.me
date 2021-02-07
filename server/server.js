const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

var corsOptions = {
  origin: 'https://www.bryanliang.me',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

const app = express()

app.use(morgan('combined'))
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000

app.use('/', express.static('public'))

app.get('/test', (req, res, next) => {
  res.json({msg: 'hello world'})
})

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})