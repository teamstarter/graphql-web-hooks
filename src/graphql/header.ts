import type {
  InAndOutTypes,
  ModelDeclarationType,
  SequelizeModels,
} from '@teamstarter/graphql-sequelize-generator/src/types/types'

export default function HeaderConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  getMetadataFromContext: Function
): ModelDeclarationType<any> {
  return {
    model: models.header,
    actions: ['create', 'update', 'delete', 'count'],
    subscriptions: ['update', 'delete'],
    create: {
      before: async ({ args, context }) => {
        const securityMetadata = getMetadataFromContext(context)

        const webhook = await models.webhook.findOne({
          where: { id: args.header.webhookId },
        })

        if (!webhook) {
          throw new Error('Cannot create header without webhook associate')
        }

        if (
          Object.entries(webhook.securityMetadata).toString() ===
          Object.entries(securityMetadata).toString()
        ) {
          return args.header
        }

        throw new Error('Wrong securityMetadata')
      },
    },
  }
}
