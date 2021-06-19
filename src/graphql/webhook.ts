import {
  ModelDeclarationType,
  SequelizeModels,
  InAndOutTypes,
} from 'graphql-sequelize-generator/types'
import { Op } from 'sequelize'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  getMetadataFromContext: Function
): ModelDeclarationType {
  return {
    model: models.webhook,
    actions: ['list', 'update', 'create', 'delete', 'count'],
    subscriptions: ['create', 'update', 'delete'],
    list: {
      before: (findOptions, args, context) => {
        if (findOptions.where) {
          findOptions.where = {
            [Op.and]: [
              findOptions.where,
              { securityMetadata: getMetadataFromContext(context) },
            ],
          }
        } else {
          findOptions.where = {
            securityMetadata: getMetadataFromContext(context),
          }
        }

        return findOptions
      },
    },
  }
}
