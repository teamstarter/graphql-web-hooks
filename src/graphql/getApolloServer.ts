import {
  generateApolloServer,
  generateModelTypes,
} from 'graphql-sequelize-generator'
import getModels from '../models'
import webhook from '../graphql/webhook'
import header from '../graphql/header'

/**
 * @param dbConfig Sequelize database configuration object
 * @param gsgParams Params from graphql-sequelize-generator that overwrite the default ones.
 */
export default async function getApolloServer(
  dbConfig: any,
  gsgParams: any = {},
  customMutations: any = {},
  isEventAllowed: any,
) {
  const models = getModels(dbConfig)

  const types = generateModelTypes(models)

  const graphqlSchemaDeclaration = {
    webhook: webhook(types, models, isEventAllowed),
    header: header(types, models),
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
    },
    customMutations,
    ...gsgParams,
  })
}
