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
describe('Test webhook endpoint', () => {
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

  it('Can fetch webhook and associated headers', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('userId', 1)
      .send(webhook({}))

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })

  it('Cannot fetch webhook without the right context', async () => {
    const response = await request(server).post('/graphql').send(webhook({}))

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })

  it('Only create webhook with associated securityMetadata', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('userId', 1)
      .send(
        webhookCreate({
          webhook: { url: 'oklm.com' },
        })
      )

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })

  it('When deleting a webhook the associated headers are deleted', async () => {
    const webhookId = 1
    const headers = await models.header.findAll({
      where: { webhookId },
    })
    expect(headers).toMatchSnapshot()

    const response = await request(server)
      .post('/graphql')
      .set('userId', 1)
      .send(
        webhookDelete({
          id: webhookId,
        })
      )

    const headersDeleted = await models.header.findAll({
      where: { webhookId },
    })

    expect(headersDeleted).toMatchSnapshot()
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toMatchSnapshot()
  })
})
