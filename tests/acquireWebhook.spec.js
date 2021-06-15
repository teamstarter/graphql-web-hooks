const request = require('supertest')

const {
  migrateDatabase,
  seedDatabase,
  getNewServer,
  models,
  closeEverything,
  deleteTables,
  resetDatabase,
} = require('./test-database.js')
const {
  getNewClient,
  callWebhook
} = require('../lib/index')

// This is the maximum amount of time the band of test can run before timing-out
jest.setTimeout(600000)

let server = null
const client = getNewClient(
  `http://localhost:${process.env.PORT || 8080}/graphql`
)

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

const acquireWebhook = (variables) => ({
  query: `mutation acquireWebhook($eventSecurityContext: JSON!, $eventType: String!) {
    acquireWebhook(eventSecurityContext: $eventSecurityContext, eventType: $eventType) {
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


/**
 * Starting the tests
 */
describe('Test acquireWebhook endpoint', () => {
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

  it('Can fetch webhook', async () => {
    const response = await request(server)
      .post('/graphql')
      .send(
        acquireWebhook({
          eventSecurityContext: { userId: 1 },
          eventType: 'publish'
        })
      )

    expect(response.body.data).toMatchSnapshot()
  })

  it('Cannot fetch inexistent webhook', async () => {
    const response = await request(server)
      .post('/graphql')
      .send(
        acquireWebhook({
          eventSecurityContext: { security: 'value' },
          eventType: 'publish'
        })
      )

    expect(response.body.errors).toMatchSnapshot()
  })

  it('Cannot fetch a webhook if event is not subscribed to it', async () => {
    const response = await request(server)
      .post('/graphql')
      .send(
        acquireWebhook({
          eventSecurityContext: { userId: 1 },
          eventType: 'action'
        })
      )

    expect(response.body.errors).toMatchSnapshot()
  })

  it('Cannot fetch a webhook if event is not allowed', async () => {
    const response = await request(server)
      .post('/graphql')
      .send(
        acquireWebhook({
          eventSecurityContext: { userId: 2 },
          eventType: 'publish'
        })
      )

    expect(response.body.errors).toMatchSnapshot()
  })
})
