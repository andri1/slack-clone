import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import typeDefs from './typeDefs'
import { resolvers } from './resolvers'
import { connectToMongoDB } from './db/connect'
import { port } from './config'
import { verifyToken } from './services/authentication'
import { Context } from './types'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()
app.use(cors())

const httpServer = createServer(app)

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
    const token = req.headers.authorization
    try {
      const { userID } = verifyToken(token)
      return {
        userID,
        authorization: token,
      }
    } catch (e) {
      return {}
    }
  },
  formatError: (err) => {
    console.error(err)
    console.error('[stacktrace] %s', err.extensions?.exception?.stacktrace)

    return err
  },
})

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: server.graphqlPath,
  },
)

const start = async () => {
  console.log('-------------------------------------------------')
  console.log('--------------SLACK-CLONE-SERVER-----------------')
  console.log('-------------------------------------------------\n')

  await connectToMongoDB()

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`)
  })
}

start()
