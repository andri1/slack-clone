import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-core'
import { UserModel } from '../db/models'
import { CreateUserInput } from '../generated/graphql'

export const createUserDoc = async (input: CreateUserInput) => {
  const hashedPassword = bcrypt.hashSync(input.password, 10)
  const newUser: CreateUserInput = { ...input, password: hashedPassword }

  return new UserModel(newUser).save()
}

export const getUserDocByID = async (id: string) => {
  const userDoc = await UserModel.findById(id).lean()
  if (!userDoc) throw new ApolloError('User not found', 'NOT_FOUND')

  return userDoc
}
