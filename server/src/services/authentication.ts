import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-core'
import { UserModel } from '../db/models'
import { UserDoc } from '../types'
import { JWT_SECRET_KEY, JWT_EXP } from '../config'

export const findUserByLogin = async (login: string): Promise<UserDoc> => {
  let user

  // find by username
  user = await UserModel.findOne({ username: login })
  // find by email
  if (!user) {
    user = await UserModel.findOne({ email: login })
  }

  if (!user) {
    throw new ApolloError('USER_NOT_FOUND', 'USER_NOT_FOUND')
  }

  return user
}

export const makeAccessToken: (payload: { userID: string }) => string = (payload) => {
  return jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + JWT_EXP,
    },
    JWT_SECRET_KEY,
  )
}

export const verifyToken = (token: string): JWTTokenPayload => {
  return jwt.verify(token, JWT_SECRET_KEY) as JWTTokenPayload
}

type JWTTokenPayload = {
  userID: string
}
