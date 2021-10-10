import { gql } from '@apollo/client'
import { MESSAGE_INFO_FRAGMENT } from './fragments'

export const CHANNEL_MESSAGE_CREATED = gql`
  subscription ChannelMessageCreated($channelID: ID!) {
    channelMessageCreated(channelID: $channelID) {
      ...MessageInfo
    }
  }
  ${MESSAGE_INFO_FRAGMENT}
`
