import bcrypt from 'bcrypt'
import { UserModel } from '../db/models'
import { CreateUserInput } from '../generated/graphql'

export const createUserDoc = async (input: CreateUserInput) => {
  const hashedPassword = bcrypt.hashSync(input.password, 10)
  const newUser: CreateUserInput = { ...input, password: hashedPassword }

  return new UserModel(newUser).save()
}
