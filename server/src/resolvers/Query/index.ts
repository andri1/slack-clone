import { QueryResolvers } from '../../generated/graphql'
import * as user from './user'

export const Query: QueryResolvers = {
  ...user,
}
