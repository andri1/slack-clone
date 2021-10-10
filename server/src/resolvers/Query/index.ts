import { QueryResolvers } from '../../generated/graphql'
import * as user from './user'
import * as channel from './channel'
import * as message from './message'

export const Query: QueryResolvers = {
  ...user,
  ...channel,
  ...message,
}
