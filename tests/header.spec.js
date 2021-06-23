const request = require('supertest')
const { Op } = require('sequelize')

const {
  migrateDatabase,
  seedDatabase,
  getNewServer,
  models,
  closeEverything,
  deleteTables,
  resetDatabase,
} = require('./test-database.js')
const { getNewClient, callWebhook, getCallWebhook } = require('../lib/index')

// This is the maximum amount of time the band of test can run before timing-out
jest.setTimeout(600000)

let server = null
const client = getNewClient(
  `http://localhost:${process.env.PORT || 8080}/graphql`
)

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

const headerCreate = (variables) => ({
  query: `mutation headerCreate($header: headerInput!) {
    headerCreate(header: $header) {
      key
      value
    }
  }`,
  variables,
  operationName: null,
})

/**
 * Starting the tests
 */
describe('Test header endpoint', () => {
  beforeAll(async () => {
    await migrateDatabase()
    await seedDatabase()
    server = await getNewServer()
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

  it('Can create header only with right securityMetadata', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('userId', 1)
      .send(
        headerCreate({
          header: {
            key: 'a',
            value: '1',
            webhookId: 1,
          },
        })
      )

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })

  it('Cannot create header without right securityMetadata', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('userId', 3)
      .send(
        headerCreate({
          header: {
            key: 'a',
            value: '1',
            webhookId: 1,
          },
        })
      )

    expect(response.body.errors).toMatchSnapshot()
  })
})
