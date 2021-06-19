import {
  ModelDeclarationType,
  SequelizeModels,
  InAndOutTypes,
} from 'graphql-sequelize-generator/types'

export default function HeaderConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels
): ModelDeclarationType {
  return {
    model: models.header,
    actions: ['create', 'delete', 'count'],
    subscriptions: ['update', 'delete'],
  }
}
