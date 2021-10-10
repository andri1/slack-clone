import { PubSub } from 'graphql-subscriptions'
export interface Context {
  userID?: string
  authorization?: string
  pubsub: PubSub
}
