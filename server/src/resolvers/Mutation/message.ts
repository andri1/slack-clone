import {
  MutationSendChannelMessageArgs,
  MutationSendDirectMessageArgs,
  RecipientType,
} from '../../generated/graphql'
import { MessageModel } from '../../db/models'
import { Context } from '../../types'
import { CHANNEL_MESSAGE_CREATED, NewChannelMessagePayload } from '../Subscription'

export const sendDirectMessage = async (
  _: any,
  { input }: MutationSendDirectMessageArgs,
  { userID }: Context,
): Promise<any> => {
  const newMessage = await new MessageModel({
    ...input,
    authorID: userID,
    recipientType: RecipientType.User,
  }).save()

  return newMessage
}

export const sendChannelMessage = async (
  _: any,
  { input }: MutationSendChannelMessageArgs,
  { userID, pubsub }: Context,
): Promise<any> => {
  const newMessage = await new MessageModel({
    ...input,
    authorID: userID,
    recipientType: RecipientType.Channel,
  }).save()

  pubsub.publish(CHANNEL_MESSAGE_CREATED, {
    channelMessageCreated: newMessage.toObject(),
  } as NewChannelMessagePayload)

  return newMessage
}
