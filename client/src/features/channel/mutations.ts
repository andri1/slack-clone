import { gql } from '@apollo/client'
import { CHANNEL_INFO_FRAGMENT } from './fragments'

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
      ...ChannelInfo
    }
  }
  ${CHANNEL_INFO_FRAGMENT}
`

// export const UPDATE_CHANNEL = gql`
//   mutation UpdateChannel($input: UpdateChannelInput!) {
//     updateChannel(input: $input) {
//       ...ChannelInfo
//     }
//   }
//   ${CHANNEL_INFO_FRAGMENT}
// `

// export const DELETE_CHANNEL = gql`
//   mutation DeleteChannel($id: ID!) {
//     deleteChannel(id: $id) {
//       ...ChannelInfo
//     }
//   }
//   ${CHANNEL_INFO_FRAGMENT}
// `
