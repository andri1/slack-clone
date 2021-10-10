import { withFilter } from 'graphql-subscriptions'
import {
  SubscriptionChannelMessageCreatedArgs,
  SubscriptionDirectMessageCreatedArgs,
  SubscriptionResolvers,
} from '../generated/graphql'
import { Context, MessageDoc } from '../types'

export const DIRECT_MESSAGE_CREATED = 'DIRECT_MESSAGE_CREATED'
export const CHANNEL_MESSAGE_CREATED = 'CHANNEL_MESSAGE_CREATED'
export type NewDirectMessagePayload = { directMessageCreated: MessageDoc }
export type NewChannelMessagePayload = { channelMessageCreated: MessageDoc }

export const Subscription: SubscriptionResolvers<Context> = {
  directMessageCreated: {
    subscribe: withFilter(
      (_, __, context: Context) => context.pubsub.asyncIterator(DIRECT_MESSAGE_CREATED),
      (
        payload: NewDirectMessagePayload,
        variables: SubscriptionDirectMessageCreatedArgs,
        { userID }: Context,
      ) => {
        const myID = userID
        const myRecipientUserID = variables.recipientUserID
        const newMessageAuthorID = payload.directMessageCreated.authorID.toString()
        const newMessageRecipientUserID = payload.directMessageCreated.recipientUserID.toString()

        return (
          (newMessageAuthorID === myID && newMessageRecipientUserID === myRecipientUserID) ||
          (newMessageAuthorID === myRecipientUserID && newMessageRecipientUserID === myID)
        )
      },
    ),
  },

  channelMessageCreated: {
    subscribe: withFilter(
      (_, __, context: Context) => context.pubsub.asyncIterator(CHANNEL_MESSAGE_CREATED),
      (payload: NewChannelMessagePayload, variables: SubscriptionChannelMessageCreatedArgs) => {
        return payload.channelMessageCreated.channelID.toString() === variables.channelID
      },
    ),
  },
}
