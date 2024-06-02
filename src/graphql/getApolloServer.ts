import {
  generateApolloServer,
  generateModelTypes,
} from '@teamstarter/graphql-sequelize-generator'
import eventType from '../graphql/eventType'
import header from '../graphql/header'
import webhook from '../graphql/webhook'
import getModels from '../models'

/**
 * @param dbConfig Sequelize database configuration object
 * @param gsgParams Params from graphql-sequelize-generator that overwrite the default ones.
 */
export default async function getApolloServer({
  dbConfig,
  sequelizeConnection,
  gsgParams,
  customMutations,
  getMetadataFromContext,
  apolloServerOptions,
  hooks,
}: {
  dbConfig: any
  sequelizeConnection: any
  gsgParams: any
  customMutations: any
  getMetadataFromContext: any
  apolloServerOptions: any
  hooks: any
}) {
  if (!hooks) {
    hooks = {
      webhook: {
        list: { before: () => {}, after: () => {} },
        create: { before: () => {}, after: () => {} },
        delete: { before: () => {}, after: () => {} },
        update: { before: () => {}, after: () => {} },
      },
    }
  }

  const models = getModels({dbConfig, sequelizeConnection})

  const types = generateModelTypes(models)

  const graphqlSchemaDeclaration = {
    webhook: webhook(types, models, getMetadataFromContext, hooks.webhook),
    header: header(types, models, getMetadataFromContext),
    eventType: eventType(types, models),
  }

  return generateApolloServer({
    graphqlSchemaDeclaration,
    types,
    models,
    globalPreCallback: () => {},
    apolloServerOptions: {
      playground: true,
      //context: addDataloaderContext,
      //   extensions: [
      //     () => new WebTransactionExtension(),
      //     () => new ErrorTrackingExtension()
      //   ],
      // Be sure to enable tracing
      tracing: false,
      ...apolloServerOptions,
    },
    customMutations,
    ...gsgParams,
  })
}
