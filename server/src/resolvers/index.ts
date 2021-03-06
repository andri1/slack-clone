import { Resolvers } from '../generated/graphql'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { User } from './User'
import { Channel } from './Channel'
import { Message } from './Message'
import { Subscription } from './Subscription'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Channel,
  Message,
}
