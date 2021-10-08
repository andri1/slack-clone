import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'

import typeDefs from './typeDefs'
import { resolvers } from './resolvers'
import { connectToMongoDB } from './db/connect'
import { port } from './config'
import { verifyToken } from './services/authentication'
import { Context } from './types/context'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  context: ({ req }: { req: any }): Context => {
    const token = req.headers.authorization
    try {
      const { userId } = verifyToken(token)
      return {
        userId,
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

const start = async () => {
  console.log('-------------------------------------------------')
  console.log('--------------SLACK-CLONE-SERVER-----------------')
  console.log('-------------------------------------------------\n')

  await connectToMongoDB()

  server.listen({ port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

start()
