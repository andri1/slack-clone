import { Resolvers } from '../generated/graphql'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { User } from './User'
import { Channel } from './Channel'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  User,
  Channel,
}
