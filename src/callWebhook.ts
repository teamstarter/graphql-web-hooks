import { Event } from './types'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import fetch from 'node-fetch'

import { Header } from './types'

const acquireWebhook = gql`
  mutation acquireWebhook($eventSecurityContext: JSON!, $eventType: String!) {
    acquireWebhook(eventSecurityContext: $eventSecurityContext, eventType: $eventType) {
      url
      headers {
        key
        value
      }
    }
  }
`

export default async function callWebhook({ eventType, eventSecurityContext, data }: Event,  client: ApolloClient<any>) {
  const response = await client.mutate({
    mutation: acquireWebhook,
    variables: { eventType, eventSecurityContext },
  })
  
  if (!response.errors) {
    const url = response.data.acquireWebhook.url
    const headers = response.data.acquireWebhook.headers.reduce((acc: any, header: Header) => {
      acc[header.key] = header.value
      return acc
    }, {})
    
    try {
      await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json',
          ...headers
        },
      })
  
    } catch (e) {
      throw new Error('Error during the request: ' + e)
    }
  }
}