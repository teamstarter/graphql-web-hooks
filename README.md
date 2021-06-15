# Graphql-Web-Hook

GWH provides the most flexible and simple tool that executes and manages webhooks.

## How to use

## Contributing

## Install environnement

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
