import { Channel as ChannelType, ChannelResolvers } from '../generated/graphql'
import { ChannelDoc } from '../types'

export const Channel: ChannelResolvers = {
  id: (parent: ChannelType & ChannelDoc) => parent.id || parent._id,
}
