import fetch from 'node-fetch'
import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
} from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

export default function getNewClient(
  uri: string,
  apolloClientOptions: Partial<ApolloClientOptions<any>> = {}
) {
  const link = createHttpLink({
    uri,
    fetch: fetch as any,
  })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link,
    cache,
    ...apolloClientOptions,
  })
  return client
}
