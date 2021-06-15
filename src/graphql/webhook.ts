import {
  ModelDeclarationType,
  SequelizeModels,
  InAndOutTypes,
} from 'graphql-sequelize-generator/types'

import acquireWebhook from './webhook/acquire'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  isEventAllowed: any
): ModelDeclarationType {
  return {
    model: models.webhook,
    actions: ['update', 'create', 'delete'],
    additionalMutations: {
      acquireWebhook: acquireWebhook(graphqlTypes, models, isEventAllowed),
    },
    list: {
      before: (findOptions) => {
        return findOptions
      },
    },
  }
}
