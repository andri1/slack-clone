import { QueryResolvers } from '../../generated/graphql'
import { ChannelModel } from '../../db/models'
import { getChannelDocByID } from '../../services/channel'

export const channel: QueryResolvers['channel'] = async (_, { id }) => {
  return getChannelDocByID(id)
}

export const channels: QueryResolvers['channels'] = async () => {
  return ChannelModel.find()
}
