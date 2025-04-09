import type {
  InAndOutTypes,
  ModelDeclarationType,
  SequelizeModels,
} from '@teamstarter/graphql-sequelize-generator/src/types/types'
import { Op } from 'sequelize'

export default function WebhookConfiguration(
  graphqlTypes: InAndOutTypes,
  models: SequelizeModels,
  getMetadataFromContext: Function,
  hook: any
): ModelDeclarationType<any> {
  return {
    model: models.webhook,
    actions: ['list', 'update', 'create', 'delete', 'count'],
    subscriptions: ['create', 'update', 'delete'],
    list: {
      beforeList: ({findOptions, args, context}) => {
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

        if (hook?.list?.before) {
          hook.list.before({ findOptions, args, context })
        }

        return findOptions
      },
      afterList: ({ result, args, context, info }) => {
        if (hook?.list?.after) {
          hook.list.after({ result, args, context, info })
        }
        return result
      },
    },
    create: {
      beforeCreate: ({ source, args, context }) => {
        if (hook?.create?.before) {
          hook.create.before({ source, args, context })
        }

        args.webhook.securityMetadata = getMetadataFromContext(context)
        return args.webhook
      },
      afterCreate: async ({ createdEntity: webhook, source, args, context }) => {
        if (hook?.create?.after) {
          hook.create?.after({ createdEntity: webhook, source, args, context })
        }

        return webhook
      },
    },
    update: {
      beforeUpdateFetch: async ({ source, args, context }) => {
        if (hook?.update?.before) {
          hook.update.before({ source, args, context })
        }
        return args.webhook
      },
      afterUpdate: async ({ updatedEntity: webhook, previousPropertiesSnapshot: oldWebhook, source, args, context }) => {
        if (hook?.update?.after) {
          hook.update.after({ updatedEntity: webhook, previousPropertiesSnapshot: oldWebhook, source, args, context })
        }
        return webhook
      },
    },
    delete: {
      beforeDeleteFetch: async ({ where, source, args, context }) => {
        if (hook?.delete?.before) {
          hook.delete.before({ where, source, args, context })
        }

        return where
      },
      afterDelete: async ({ deletedEntity: deletedWebhook, source, args, context }) => {
        if (hook?.delete?.after) {
          hook.delete.after({ deletedEntity: deletedWebhook, source, args, context })
        }

        await models.header.destroy({
          where: { webhookId: deletedWebhook.id },
        })

        await models.eventType.destroy({
          where: { webhookId: deletedWebhook.id },
        })
      },
    },
  }
}
