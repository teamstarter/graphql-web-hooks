import { GraphQLString, GraphQLNonNull } from 'graphql'
import GraphQLJSON from 'graphql-type-json';
import {
  CustomMutationConfiguration,
  InAndOutTypes,
  SequelizeModels,
} from 'graphql-sequelize-generator/types'


export default function AcquireWebhookDefinition(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  isEventAllowed: any
): CustomMutationConfiguration {
  return {
    type: graphqlTypes.outputTypes.webhook,
    description:
      '',
    args: {
      eventSecurityContext: {
        type: new GraphQLNonNull(GraphQLJSON),
      },
      eventType: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: async (source, args, context) => {
      const { eventSecurityContext, eventType } = args

      const webhook = await models.webhook.findOne({
        where: { securityMetadata: eventSecurityContext }
      })

      if (!webhook) {
        throw new Error('No webhook found')
      }

      if (webhook.eventTypesWhitelist.length) {
        if (!webhook.eventTypesWhitelist.includes(eventType)) {
          throw new Error('This webhook is not subscribe at this event')
        }
      }

      if (!isEventAllowed({ eventSecurityContext, eventType, webhook })) {
        throw new Error('This event is not allowed for this webhook')
      }

      return webhook
    },
  }
}
