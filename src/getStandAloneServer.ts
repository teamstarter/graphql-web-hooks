import { getApolloServer } from './../lib/index'
import cors from 'cors'
import { json } from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'

export default async function getStandAloneServer(
  dbConfig: any,
  gsgParams: any = {},
  customMutations: any = {},
  getMetadataFromContext: any,
  apolloServerOptions: any = {}
) {
  const express = require('express')
  const http2 = require('http')
  const { WebSocketServer } = require('ws')

  const app = express()

  const httpServer = http2.createServer(
    {
      spdy: {
        plain: true,
      },
    },
    app
  )

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
  })

  const server = await getApolloServer({
    dbConfig,
    gsgParams,
    customMutations,
    getMetadataFromContext,
    apolloServerOptions,
    wsServer,
  })

  await server.start()

  app.use('/graphql', cors(), json(), expressMiddleware(server, {}))

  const port = process.env.PORT || 8080

  httpServer.listen(port, async () => {
    console.log(
      `🚀 http/https/h2 server runs on  http://localhost:${port}/graphql .`
    )
  })

  return httpServer
}
