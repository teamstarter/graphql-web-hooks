# Graphql-Web-Hook

GWH provides a flexible and simple tool to executes and manages webhooks in a GraphQL environement.

It is based on graphql-sequelize-generator and inspired by graphql-node-jobs.

## How to use

classic use case

```js
const { getCallWebhook } = require('graphql-web-hook')

const callWebhook = getCallWebhook(getMetadataFromContext)

await callWebhook({
  evenType: 'publish',
  context: {
    userId: 1,
    ...
  },
  data: {
    text: 'New post publish',
  },
})
```

## How setup

Add GWH to your repository

```
yarn add graphql-web-hook
```

Migrate models

```
yarn run gnj migrate <configPath>
```

Add server apollo to your express server

```js
const { getApolloServer } = require('graphql-web-hook')

const webhookServer = await getApolloServer({
  dbConfig,
  apolloServerOptions: { context: ({ req }) => req },
  getMetadataFromContext: (context) => {
    return getUserIdFromContext(context)
  },
)}

webhookServer.applyMiddleware({
  app,
  path: '/webhook/graphql',
})


app.use('/webhook', [middleware])
```

## Documentation

### getCallWebhook

This function initializes and returns callWebhook by assigning it getMetadataFormContext function.

**Params :**

- **getMetadataFromContext** : function that should return the securityMetadata of a webhooks from a context.

### callWebhook

Function to call webhook.

**How it works :** <br />

- Retrieves webhooks according to the type of event and its security metadata
- Make request to all webhook with the associated data

**Params :**

- **data** : data to be sent to the webhook
- **eventType** : type of event
- **context** : context related to the event

### getMetadataFromContext

The purpose of this function is to return the security parameters of a webhook from a context. (It's called when you fetch a webhook)

**Example :**

```js
const { getApolloServer } = require('graphql-web-hook')

...

getApolloServer({
  ...
  getMetadataFromContext: (context) => {
    return getUserIdFromContext(context)
  }
}
```

## Contributing

### Install environnement

yarn :

```
  apt-get install git curl yarn
  # or
  brew install git curl yarn
```

#### Project

```
git clone git@github.com:teamstarter/graphql-web-hooks.git
cd graphql-web-hooks
yarn
yarn start
```

#### Test the migration script locally

```
yarn run gnj migrate ./../tests/sqliteTestConfig.js
```

#### Start a test server using the test database migrated previously

```
yarn start
```

#### Running the test

```
yarn test
```

Debugging a specific test

```
node --inspect-brk ./node_modules/jest/bin/jest.js ./tests/job.spec.js
```
