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
      beforeList: ({ findOptions }) => {
        return findOptions
      },
    },
    create: {
      beforeCreate: ({ args }) => {
        return args.eventType
      },
    },
  }
}
