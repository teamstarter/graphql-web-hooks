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

const { postRequest } = require('../lib/tools')

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
describe('Test callWebhook function', () => {
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
    const callWebhook = getCallWebhook((context) => context)

    await callWebhook({
      eventType: 'delete',
      context: { userId: 1 },
      data: {
        key: 'value',
        eventType: 'delete',
      },
    })

    expect(postRequest.mock.calls.length).toBe(1)
    expect(postRequest.mock.calls[0][0]).toMatchSnapshot()
  })

  it('If there is no webhook no request made', async () => {
    const callWebhook = getCallWebhook((context) => context)

    await callWebhook({
      eventType: 'publish',
      context: { userId: 100 },
      data: {
        key: 'value',
        eventType: 'publish',
      },
    })

    expect(postRequest.mock.calls.length).toBe(0)
    expect(postRequest.mock.calls).toMatchSnapshot()
  })

  it('there is just one webhook called for one user', async () => {
    const callWebhook = getCallWebhook((context) => context)

    await callWebhook({
      eventType: 'delete',
      context: { userId: 1 },
      data: {
        key: 'value',
        eventType: 'delete',
      },
    })

    expect(postRequest.mock.calls.length).toBe(1)
    expect(postRequest.mock.calls).toMatchSnapshot()
  })

  it('there is 2 webhooks called for one user ', async () => {
    const callWebhook = getCallWebhook((context) => context)

    await callWebhook({
      eventType: 'publish',
      context: { userId: 1 },
      data: {
        key: 'value',
        eventType: 'publish',
      },
    })
    expect(postRequest.mock.calls.length).toBe(2)
    expect(postRequest.mock.calls).toMatchSnapshot()
  })
})
