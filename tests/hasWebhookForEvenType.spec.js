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
const { getNewClient, hasWebhookForEvenType } = require('../lib/index')

// This is the maximum amount of time the band of test can run before timing-out
jest.setTimeout(600000)

let server = null
const client = getNewClient(
  `http://localhost:${process.env.PORT || 8080}/graphql`
)

jest.mock('../lib/tools.js', () => ({
  __esModule: true,
  postRequest: jest.fn(),
}))

/**
 * Starting the tests
 */
describe('Test hasWebhookForEvenType function', () => {
  beforeAll(async () => {
    await migrateDatabase()
    await seedDatabase()
    server = await getNewServer()
  })

  beforeEach(async () => {
    await resetDatabase()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await deleteTables()
  })

  afterAll(async () => {
    await closeEverything(server, models)
  })

  it('Can call a webhook', async () => {
    const webhookForEvenType = hasWebhookForEvenType((context) => context)

    const result = await webhookForEvenType({
      eventType: 'delete',
      context: { userId: 1 },
      data: {
        key: 'value',
      },
    })

    expect(result).toBe(true)
  })

  it('If there is no webhook no request made', async () => {
    const webhookForEvenType = hasWebhookForEvenType((context) => context)

    const result = await webhookForEvenType({
      eventType: 'publish',
      context: { userId: 100 },
      data: {
        key: 'value',
      },
    })

    expect(result).toBe(false)
  })

  it('there is just one webhook called for one user', async () => {
    const webhookForEvenType = hasWebhookForEvenType((context) => context)

    const result = await webhookForEvenType({
      eventType: 'delete',
      context: { userId: 1 },
      data: {
        key: 'value',
      },
    })

    expect(result).toBe(true)
  })

  it('there is 2 webhooks called for one user ', async () => {
    const webhookForEvenType = hasWebhookForEvenType((context) => context)

    const result = await webhookForEvenType({
      eventType: 'publish',
      context: { userId: 1 },
      data: {
        key: 'value',
      },
    })

    expect(result).toBe(true)
  })
})
