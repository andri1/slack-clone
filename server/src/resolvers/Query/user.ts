import { QueryResolvers } from '../../generated/graphql'
import { UserModel } from '../../db/models'
import { Context } from '../../types/context'
import { getUserDocByID } from '../../services/user'

export const user: QueryResolvers['user'] = async (_, { id }) => {
  return getUserDocByID(id)
}

export const users: QueryResolvers['users'] = async () => {
  return UserModel.find()
}

export const me: QueryResolvers<Context>['me'] = async (_, __, ctx) => {
  return getUserDocByID(ctx.userID)
}
