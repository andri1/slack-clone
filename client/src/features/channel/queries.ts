import { gql } from '@apollo/client'
import { CHANNEL_INFO_FRAGMENT } from './fragments'

export const GET_CHANNEL = gql`
  query GetChannel($id: ID!) {
    channel(id: $id) {
      ...ChannelInfo
    }
  }
  ${CHANNEL_INFO_FRAGMENT}
`

export const GET_CHANNELS = gql`
  query GetChannels {
    channels {
      ...ChannelInfo
    }
  }
  ${CHANNEL_INFO_FRAGMENT}
`
