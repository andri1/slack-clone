import { User as UserType, UserResolvers } from '../generated/graphql'
import { UserDoc } from '../types'

export const User: UserResolvers = {
  id: (parent: UserType & UserDoc) => parent.id || parent._id,
}
