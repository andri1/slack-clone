import { gql } from '@apollo/client'

export const CHANNEL_INFO_FRAGMENT = gql`
  fragment ChannelInfo on Channel {
    id
    name
    description
  }
`
