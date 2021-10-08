import { ApolloError } from 'apollo-server'
import { MutationResolvers } from '../../generated/graphql'
import { UserModel } from '../../db/models'
import { createUserDoc } from '../../services/user'

export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
  return createUserDoc(input)
}

export const updateUser: MutationResolvers['updateUser'] = async (_, { input }) => {
  const { id, ...inputRest } = input

  const user: any = await UserModel.findByIdAndUpdate(id, inputRest, {
    new: true,
  }).lean()

  if (!user) throw new ApolloError('User not found', 'NOT_FOUND')

  return user
}

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { id }) => {
  const user = await UserModel.findByIdAndDelete(id)

  if (!user) throw new ApolloError('User not found', 'NOT_FOUND')

  return user._id
}
