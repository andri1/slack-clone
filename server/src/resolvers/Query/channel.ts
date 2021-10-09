import { QueryResolvers } from '../../generated/graphql'
import { ChannelModel } from '../../db/models'
import { ApolloError } from 'apollo-server-core'

export const channel: QueryResolvers['channel'] = async (_, { id }) => {
  const channelDoc = await ChannelModel.findById(id).lean()
  if (!channelDoc) throw new ApolloError('Channel not found', 'NOT_FOUND')

  return channelDoc
}

export const channels: QueryResolvers['channels'] = async () => {
  return ChannelModel.find()
}
