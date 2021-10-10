import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { PubSub } from 'graphql-subscriptions'

import typeDefs from './typeDefs'
import { resolvers } from './resolvers'
import { connectToMongoDB } from './db/connect'
import { port } from './config'
import { verifyToken } from './services/authentication'
import { Context } from './types'

const start = async () => {
  console.log('-------------------------------------------------')
  console.log('--------------SLACK-CLONE-SERVER-----------------')
  console.log('-------------------------------------------------\n')

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const app = express()
  app.use(cors())

  const pubsub = new PubSub()

  const createContext = (token?: string) => {
    let context = { pubsub }

    if (token) {
      try {
        const { userID } = verifyToken(token)
        return {
          ...context,
          userID,
          authorization: token,
        }
      } catch {
        return context
      }
    }

    return context
  }

  await connectToMongoDB()

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
    context: ({ req }): Context => {
      return createContext(req.headers.authorization)
    },
    formatError: (err) => {
      console.error(err)
      console.error('[stacktrace] %s', err.extensions?.exception?.stacktrace)

      return err
    },
  })

  await server.start()

  server.applyMiddleware({ app })

  const httpServer = createServer(app)

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams: { authorization?: string }): Context {
        return createContext(connectionParams.authorization)
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  )

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`)
  })
}

start()
