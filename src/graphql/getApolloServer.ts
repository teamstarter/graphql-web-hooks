import {
  generateApolloServer,
  generateModelTypes,
} from 'graphql-sequelize-generator'
import getModels from '../models'
import webhook from '../graphql/webhook'
import header from '../graphql/header'
import eventType from '../graphql/eventType'

/**
 * @param dbConfig Sequelize database configuration object
 * @param gsgParams Params from graphql-sequelize-generator that overwrite the default ones.
 */
export default async function getApolloServer(
  {
    dbConfig,
    gsgParams,
    customMutations,
    getMetadataFromContext,
    apolloServerOptions,
  }: {
    dbConfig: any
    gsgParams: any
    customMutations: any
    getMetadataFromContext: any
    apolloServerOptions: any
  } = {
    dbConfig: {},
    gsgParams: {},
    customMutations: {},
    getMetadataFromContext: () => {},
    apolloServerOptions: {},
  }
) {
  const models = getModels(dbConfig)

  const types = generateModelTypes(models)

  const graphqlSchemaDeclaration = {
    webhook: webhook(types, models, getMetadataFromContext),
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
