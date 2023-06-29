const path = require('path')
const { getApolloServer } = require('./../lib/index')
const express = require('express')
const http = require('spdy')
const { PubSub } = require('graphql-subscriptions')
const { WebSocketServer } = require('ws')
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const { json } = require('body-parser')

const config = require('./sqliteTestConfig.js')
const { getMetadataFromContext } = require('./tools')
const app = express()

var dbConfig = require(path.join(__dirname, '/sqliteTestConfig.js')).test

async function startServer() {
  var options = {
    spdy: {
      plain: true,
    },
  }
  const httpServer = http.createServer(options, app)

  const pubSubInstance = new PubSub()

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
  })

  const server = await getApolloServer({
    dbConfig,
    pubSubInstance,
    getMetadataFromContext,
    playground: true,
    wsServer,
    apolloServerOptions: {},
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      // THIS IS FOR TESTING PURPOSE, DO NOT DO THAT IN PRODUCTION
      context: ({ req }) => ({ userId: req.headers.userId }),
    })
  )

  const port = process.env.PORT || 8080

  httpServer.listen(port, async () => {
    console.log(
      `🚀 http/https/h2 server runs on  http://localhost:${port}/graphql .`
    )
  })
}

startServer()
