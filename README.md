# Graphql-Web-Hook

GWH provides the most flexible and simple tool that executes and manages webhooks.

## How to use

### Getting started

```js
const { getCallWebhook } = require('graphql-web-hook')

...

function getMetadataFromContext(context) {
  return { userId: context.userId }
}

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

### getCallWebhook

The purpose of this function is to initialize callWebhook by assigning it the parameter getMetadataFormContext.

**Params :**

- getMetadataFromContext : function that should return the securityMetadata of a webhooks from a context.

### callWebhook

Function to call webhook.

**How it works :** <br />

- Retrieves webhooks according to the type of the event and its security metadata
- Make a request to all webhook with the associated data

**Params :**

- **data** : data to be sent to the webhook
- **eventType** : type of event
- **context** : context related to the event

### getMetadataFromContext

The purpose of this function is to return the security parameters of a webhook from a context. (It's called when you make a webhook)

**Params :**

**Example :**

```js
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
