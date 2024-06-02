const request = require('supertest')
const { Op, Sequelize } = require('sequelize')
const path = require('path')

const {
  migrateDatabase,
  seedDatabase,
  getNewServer,
  models,
  closeEverything,
  deleteTables,
  resetDatabase,
} = require('./test-database.js')
const { removeTimestamps } = require('./tools.js')
const { getNewClient, callWebhook, getCallWebhook } = require('../lib/index')

// This is the maximum amount of time the band of test can run before timing-out
jest.setTimeout(600000)

let server = null
const client = getNewClient(
  `http://localhost:${process.env.PORT || 8080}/graphql`
)

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

const webhook = (variables) => ({
  query: `query webhook($where: SequelizeJSON) {
    webhook(where: $where) {
      url
      headers {
        key
        value
      }
    }
  }`,
  variables,
  operationName: null,
})

const webhookCreate = (variables) => ({
  query: `mutation webhookCreate($webhook: webhookInput!) {
    webhookCreate(webhook: $webhook) {
      url
      securityMetadata
      headers {
        key
        value
      }
    }
  }`,
  variables,
  operationName: null,
})

const webhookDelete = (variables) => ({
  query: `mutation webhookDelete($id: Int!) {
    webhookDelete(id: $id)
  }`,
  variables,
  operationName: null,
})

/**
 * Starting the tests
 */
describe('Test server options', () => {
  beforeAll(async () => {
    await migrateDatabase()
    await seedDatabase()
    
  })

  beforeEach(async () => {
    await resetDatabase()
  })

  afterEach(async () => {
    await deleteTables()
  })

  afterAll(async () => {
    await closeEverything(server, models)
  })

  it('Check the server can be initialize with a sequelize connection already connected.', async () => {
    var dbConfig = require(path.join(__dirname, '/sqliteTestConfig.js')).test
    const sequelize = new Sequelize(dbConfig)
    server = await getNewServer(sequelize)

    const response = await request(server)
      .post('/graphql')
      .set('userId', 1)
      .send(webhook({}))

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })
})
