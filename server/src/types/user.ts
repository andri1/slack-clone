import { Document } from 'mongoose'
import { User } from '../generated/graphql'

export type UserDoc = User & Document
