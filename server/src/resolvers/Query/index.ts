import { QueryResolvers } from '../../generated/graphql'
import * as user from './user'
import * as channel from './channel'

export const Query: QueryResolvers = {
  ...user,
  ...channel,
}
