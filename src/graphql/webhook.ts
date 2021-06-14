import {
  ModelDeclarationType,
  SequelizeModels,
  InAndOutTypes,
} from 'graphql-sequelize-generator/types'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  isEventAllowed: any
): ModelDeclarationType {
  return {
    model: models.webhook,
    actions: ['list', 'update', 'create', 'delete'],
    list: {
      before: (findOptions) => {
        return findOptions
      },
      after: (webhook: any, args, context, info) => {
        const { eventSecurityContext, eventType } = args

        if (!webhook.length) {
          throw new Error('No webhook found')
        }

        if (webhook.eventTypesWhitelist.length) {
          if (!webhook.eventTypesWhitelist.includes(eventType)) {
            throw new Error('This webhook is not subscribe at this event')
          }
        }

        if (!isEventAllowed({ eventSecurityContext, eventType, webhook })) {
          throw new Error('Event is not allowed for this webhook')
        }

        return webhook
      }
    },
  }
}
