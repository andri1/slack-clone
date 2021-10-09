import { ApolloError } from 'apollo-server-core'
import { MutationResolvers } from '../../generated/graphql'
import { ChannelModel } from '../../db/models'

export const createChannel: MutationResolvers['createChannel'] = async (_, { input }) => {
  return new ChannelModel(input).save()
}

export const updateChannel: MutationResolvers['updateChannel'] = async (_, { input }) => {
  const { id, ...inputRest } = input

  const channel: any = await ChannelModel.findByIdAndUpdate(id, inputRest, {
    new: true,
  }).lean()

  if (!channel) throw new ApolloError('Channel not found', 'NOT_FOUND')

  return channel
}

export const deleteChannel: MutationResolvers['deleteChannel'] = async (_, { id }) => {
  const channel = await ChannelModel.findByIdAndDelete(id).lean()

  if (!channel) throw new ApolloError('Channel not found', 'NOT_FOUND')

  return channel
}
