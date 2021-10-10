import { gql } from '@apollo/client'
import { MESSAGE_INFO_FRAGMENT } from './fragments'

export const DIRECT_MESSAGE_CREATED = gql`
  subscription DirectMessageCreated($recipientUserID: ID!) {
    directMessageCreated(recipientUserID: $recipientUserID) {
      ...MessageInfo
    }
  }
  ${MESSAGE_INFO_FRAGMENT}
`

export const CHANNEL_MESSAGE_CREATED = gql`
  subscription ChannelMessageCreated($channelID: ID!) {
    channelMessageCreated(channelID: $channelID) {
      ...MessageInfo
    }
  }
  ${MESSAGE_INFO_FRAGMENT}
`
