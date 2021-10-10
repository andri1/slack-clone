import { Message as MessageType, MessageResolvers } from '../generated/graphql'
import { getChannelDocByID } from '../services/channel'
import { getUserDocByID } from '../services/user'
import { Context, MessageDoc } from '../types'

export const Message: MessageResolvers<Context, MessageType & MessageDoc> = {
  id: (parent) => parent.id || parent._id,

  author: async (parent) => {
    if (parent.author?.id && parent.author?.firstName) return parent.author

    return getUserDocByID(parent.authorID)
  },

  recipientUser: async (parent) => {
    if (parent.recipientUser?.id && parent.recipientUser?.firstName) return parent.recipientUser

    return getUserDocByID(parent.recipientUserID)
  },

  channel: async (parent) => {
    if (parent.channel?.id && parent.channel?.name) return parent.channel

    return getChannelDocByID(parent.channelID)
  },
}
