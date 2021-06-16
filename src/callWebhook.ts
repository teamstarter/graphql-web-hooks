import { Event } from './types'
import { Header } from './types'
import getModels from './models'
import { postRequest } from './tools'

export default function getCallWebhook(getMetadataFromContext: any) {
  return async function callWebhook({ eventType, context, data }: Event) {
    const models = getModels({})
    const webhooks = await models.webhook.findAll({
      where: {
        securityMetadata: getMetadataFromContext(context),
      },
      includes: [
        { model: models.header, as: 'headers' },
        {
          model: models.eventType,
          required: true,
          where: { type: [eventType, 'all'] },
        },
      ],
    })

    for (const webhook of webhooks) {
      const headers = await webhook.getHeaders()
      const url = webhook.url
      try {
        await postRequest({
          url,
          data,
          headers: headers.reduce((acc: any, header: Header) => {
            acc[header.key] = header.value
            return acc
          }, {}),
        })
      } catch (e) {
        throw new Error('Error during the request: ' + e)
      }
    }
  }
}
