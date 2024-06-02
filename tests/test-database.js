const path = require('path')
const fs = require('fs')
const Umzug = require('umzug')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const express = require('express')
const http = require('spdy')
const { PubSub } = require('graphql-subscriptions')
const { WebSocketServer } = require('ws')
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const { json } = require('body-parser')

const {
  getStandAloneServer,
  getModels,
  getApolloServer,
} = require('./../lib/index')

const { getMetadataFromContext } = require('./tools')
var dbConfig = require(path.join(__dirname, '/sqliteTestConfig.js')).test

const models = getModels({dbConfig})
const sequelize = models.sequelize // sequelize is the instance of the db

/**
 * This file handles an im-memory SQLite database used for test purposes.
 * It exports three functions:
 * - migrateDatabase: generates the database from the migrations files
 * - seedDatabase: seeds the database from the seeders files
 * - deleteTables: delete all the tables
 * It also exports sequelize models.
 * - models
 */

/**
 * Generates options for umzug. `path` indicates where to find the migrations or seeders (either in ./migrations or ./seeders).
 * Returns a JS plain Object with the correct options, ready to feed `new Umzug(...)`.
 */
const umzugOptions = (path) => ({
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor, // DataTypes
      function () {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        )
      },
    ],
    path,
    pattern: /\.js$/,
  },
})

// Array containing the filenames of the migrations files without extensions, sorted chronologically.
const migrationFiles = fs
  .readdirSync('./migrations/')
  .sort()
  .map((f) => path.basename(f, '.js'))

// Array containing the filenames of the seeders files without extensions, sorted chronologically.
const seederFiles = fs
  .readdirSync('./seeders/')
  .sort()
  .map((f) => path.basename(f, '.js'))

// Instances of Umzug for migrations and seeders
const umzugMigrations = new Umzug(umzugOptions('./migrations'))
const umzugSeeders = new Umzug(umzugOptions('./seeders'))

/**
 * Migrates the database
 */
exports.migrateDatabase = async () =>
  umzugMigrations.up({
    migrations: migrationFiles,
  })

/**
 * Seeds the database with mockup data
 */
exports.seedDatabase = async () =>
  umzugSeeders.up({
    migrations: seederFiles,
  })

/**
 * Deletes all the tables
 */
exports.deleteTables = async () => {
  await sequelize.getQueryInterface().dropAllTables()
}

exports.resetDatabase = async () => {
  try {
    await exports.migrateDatabase()
    await exports.seedDatabase()
  } catch (e) {
    console.log('Critical error during the database migration', e.message, e)
    throw e
  }
}

exports.models = models

async function closeConnections() {
  await models.sequelize.close()
}

exports.closeEverything = async (mainServer, models) => {
  await new Promise((resolve) => mainServer.close(() => resolve()))
  await closeConnections(models)
}

const middlewareContext = async (req, res, next) => {
  next()
}

exports.getNewServer = async (sequelizeInstance) => {
  const app = express()
  const httpServer = http.createServer(
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
  const pubSubInstance = new PubSub()

  const server = sequelizeInstance ? await getApolloServer({
    sequelizeInstance,
    getMetadataFromContext,
    pubSubInstance,
    wsServer,
    apolloServerOptions: {},
  }): await getApolloServer({
    dbConfig,
    getMetadataFromContext,
    pubSubInstance,
    wsServer,
    apolloServerOptions: {},
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: ({ req }) => req,
    })
  )

  const port = process.env.PORT || 8080

  httpServer.listen(port, async () => {
    console.log(
      `🚀 http/https/h2 server runs on  http://localhost:${port}/graphql .`
    )
  })
  return httpServer
}
