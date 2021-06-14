import { Event } from './types'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'

import { Header } from './types'

const webhook = gql`
  mutation webhook($typeList: [String!]!, $workerId: String) {
    webhook(typeList: $typeList, workerId: $workerId) {
      url
      headers {
        key
        value
      }
    }
  }
`


export default async function callWebhook({ type, eventSecurityContext, data }: Event,  client: ApolloClient<any>) {
  try {
    const response = await client.query({
      query: webhook,
      variables: { type, eventSecurityContext },
    })

    const url = response.data.url
    const headers = response.data.headers.reduce((acc: any, header: Header) => {
      acc[header.key] = header.value
      return acc
    }, {})

    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json',
        ...headers
      },
    })

  } catch (e) {

  }
}