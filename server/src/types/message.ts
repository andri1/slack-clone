import { Document } from 'mongoose'
import { Message } from '../generated/graphql'

export type MessageDoc = Omit<Message, 'author' | 'recipientUser' | 'channel'> & {
  authorID: string
  recipientUserID?: string
  channelID?: string
} & Document
