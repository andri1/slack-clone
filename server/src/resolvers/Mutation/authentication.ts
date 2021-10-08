import bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-core'
import { MutationResolvers, MutationLoginArgs } from '../../generated/graphql'
import { findUserByLogin, makeAccessToken } from '../../services/authentication'
import { createUserDoc } from '../../services/user'

export const login: MutationResolvers['login'] = async (
  _,
  { login: loginArg, password }: MutationLoginArgs,
) => {
  const user = await findUserByLogin(loginArg)

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApolloError('Wrong Password', 'WRONG_PASSWORD')
  }

  const accessToken = makeAccessToken({ userId: user._id })

  return { accessToken }
}

export const signup: MutationResolvers['signup'] = async (_, { input }) => {
  const user = await createUserDoc(input)
  const accessToken = makeAccessToken({ userId: user._id })

  return { accessToken }
}
