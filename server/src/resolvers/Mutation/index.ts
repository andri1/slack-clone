import { MutationResolvers } from '../../generated/graphql'
import * as authentication from './authentication'
import * as user from './user'

export const Mutation: MutationResolvers = {
  ...authentication,
  ...user,
}
