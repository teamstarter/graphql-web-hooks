import { Event } from './types'
import getModels from './models'

export default function getHasWebhookForEvenType(getMetadataFromContext: any) {
  return async function hasWebhookForEvenType({ eventType, context }: Event) {
    const models = getModels({})
    const webhooks = await models.webhook.findAll({
      where: {
        securityMetadata: getMetadataFromContext(context),
      },
      include: [
        {
          model: models.eventType,
          as: 'eventTypes',
          required: true,
          where: { type: [eventType, 'all'] },
        },
      ],
    })

    return webhooks.length > 0
  }
}
