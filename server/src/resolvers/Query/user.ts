import { QueryResolvers } from '../../generated/graphql'
import { UserModel } from '../../db/models'
import { Context } from '../../types/context'
import { ApolloError } from 'apollo-server-core'

export const user: QueryResolvers['user'] = async (_, { id }) => {
  const userDoc = await UserModel.findById(id).lean()
  if (!userDoc) throw new ApolloError('User not found', 'NOT_FOUND')

  return userDoc
}

export const users: QueryResolvers['users'] = async () => {
  return UserModel.find()
}

export const me: QueryResolvers<Context>['me'] = async (_, __, ctx) => {
  return UserModel.findById(ctx.userId).lean()
}
