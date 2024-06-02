import type {
  InAndOutTypes,
  ModelDeclarationType,
  SequelizeModels,
} from '@teamstarter/graphql-sequelize-generator/src/types/types'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels
): ModelDeclarationType<any> {
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
        return args.eventType
      },
    },
  }
}
