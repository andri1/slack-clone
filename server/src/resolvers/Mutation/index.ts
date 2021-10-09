import { MutationResolvers } from '../../generated/graphql'
import * as authentication from './authentication'
import * as user from './user'
import * as channel from './channel'

export const Mutation: MutationResolvers = {
  ...authentication,
  ...user,
  ...channel,
}
