import { ApolloError } from 'apollo-server-core'
import { ChannelModel } from '../db/models'

export const getChannelDocByID = async (id: string) => {
  const channel = await ChannelModel.findById(id).lean()
  if (!channel) throw new ApolloError('Channel not found', 'NOT_FOUND')

  return channel
}
