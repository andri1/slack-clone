import { Document } from 'mongoose'
import { User, Channel } from '../generated/graphql'

export type UserDoc = User & Document
export type ChannelDoc = Channel & Document
