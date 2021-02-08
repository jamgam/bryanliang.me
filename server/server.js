const express = require('express')
const compression = require('compression')
const hash = require('object-hash')
const config = require('dotenv').config()

const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = graphql
const { query } = require('./schemas/queries')
const { mutation } = require('./schemas/mutations')

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express()
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('public'))

app.use('/graphQl', (req, res, next) => {
  const { query, verificationHash } = req.body
  if (verificationHash === hash({query, key: process.env.SECRET_KEY})) {
    next()
  } else {
    res.sendStatus(401)
  }
})

app.use(
  '/graphQl',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.post('/score', (req, res, next) => {
  let valid = false

  const { score, time, verificationHash } = req.body
  
  if (hash({score, time, key: process.env.SECRET_KEY}) === verificationHash) {
    valid = true
  }

  res.json(valid)
})

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})