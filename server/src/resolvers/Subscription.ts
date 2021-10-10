import { withFilter } from 'graphql-subscriptions'
import { SubscriptionChannelMessageCreatedArgs, SubscriptionResolvers } from '../generated/graphql'
import { Context, MessageDoc } from '../types'

export const CHANNEL_MESSAGE_CREATED = 'CHANNEL_MESSAGE_CREATED'
export type NewChannelMessagePayload = { channelMessageCreated: MessageDoc }

export const Subscription: SubscriptionResolvers<Context> = {
  channelMessageCreated: {
    subscribe: withFilter(
      (_, __, context: Context) => context.pubsub.asyncIterator(CHANNEL_MESSAGE_CREATED),
      (payload: NewChannelMessagePayload, variables: SubscriptionChannelMessageCreatedArgs) => {
        return payload.channelMessageCreated.channelID.toString() === variables.channelID
      },
    ),
  },
}
