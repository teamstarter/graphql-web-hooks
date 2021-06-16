import fetch from 'node-fetch'

import { Event } from './types'
import { Header } from './types'
import getModels from './models'

export default function getCallWebhook(getMetadataFromContext: any) {
  return async function callWebhook({ eventType, context, data }: Event) {
    const models = getModels({})
    const webhooks = await models.webhook.findAll({
      where: {
        securityMetadata: getMetadataFromContext(context),
      },
      includes: [
        { model: models.header },
        {
          model: models.eventType,
          required: true,
          where: { type: [eventType, 'all'] },
        },
      ],
    })

    for (const webhook of webhooks) {
      const url = webhook.url
      const headers = webhook.headers.reduce((acc: any, header: Header) => {
        acc[header.key] = header.value
        return acc
      }, {})

      try {
        await fetch(url, {
          method: 'post',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json', ...headers },
        })
      } catch (e) {
        throw new Error('Error during the request: ' + e)
      }
    }
  }
}
