import {
  ModelDeclarationType,
  SequelizeModels,
  InAndOutTypes,
} from 'graphql-sequelize-generator/types'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels
): ModelDeclarationType {
  return {
    model: models.eventType,
    actions: ['list', 'update', 'create', 'delete'],
    list: {
      before: (findOptions, args, context) => {
        return findOptions
      },
    },
    create: {
      before: (source, args, context) => {
        return { ...args, type: 'all' }
      },
    },
  }
}
