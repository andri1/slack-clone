import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { GRAPHQL_SERVER_URI, WS_URI } from 'config'
import { getToken } from 'features/authentication/utils'

const token = getToken()

export const createClient = () => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token || '',
      },
    }
  })

  const httpLink = new HttpLink({ uri: GRAPHQL_SERVER_URI })

  const wsLink = new WebSocketLink({
    uri: WS_URI,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: token,
      },
    },
  })

  const errorLink = onError((error) => {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(
          `[GraphQL error] Code:${extensions?.code}, Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
      })
    }
    if (networkError) {
      console.log(`[Network error] ${networkError}`)
    }
  })

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    from([errorLink, authLink, httpLink]),
  )

  const cache = new InMemoryCache()

  return new ApolloClient({
    link,
    cache: cache,
  })
}
