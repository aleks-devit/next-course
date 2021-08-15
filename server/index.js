const express = require('express')
const next = require('next')
// Эта штука поможет нам общаться с graphql
const {graphqlHTTP} = require('express-graphql')
// Импортируем конструктор схем
const {buildSchema} = require('graphql')

const port = parseInt(process.env.PORT, 10) || 3010
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const data = {
  portfolios: [
    {
      _id: "sad87da79",
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016'
    },
    {
      _id: "da789ad1",
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013'
    },
    {
      _id: "sadcxv9",
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011'
    }
  ]
}

app.prepare().then(() => {
  const server = express()
// А тут мы будем строить схемы c помощью языка схем GRAPHQL
  const schema = buildSchema(`
    type Portfolio {
      _id: ID
      title: String
      company: String
      companyWebsite: String
      location: String
      jobTitle: String
      description: String
      startDate: String
      endDate: String
    }
  
    type Query {
    hello: String
    portfolio: Portfolio
    portfolios: [Portfolio]
    }
  `)
// root предоставляет преобразователь (resolver) для каждой конечной точки API
  const root = {
    hello: () => 'Hello World!',
    portfolio: () => data.portfolios[0],
    portfolios: () => data.portfolios
  }

  server.use('/graphql', graphqlHTTP({
    // Передаем графу схему
    schema,
    // Передаем преобразователи
    rootValue: root,
    // Это как я понимаю IDE для работы с графом
    graphiql: true
  }))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
