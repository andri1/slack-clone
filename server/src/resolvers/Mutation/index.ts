import { MutationResolvers } from '../../generated/graphql'
import * as authentication from './authentication'
import * as user from './user'
import * as channel from './channel'
import * as message from './message'

export const Mutation: MutationResolvers = {
  ...authentication,
  ...user,
  ...channel,
  ...message,
}
