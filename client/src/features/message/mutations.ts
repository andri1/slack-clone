import { gql } from '@apollo/client'
import { MESSAGE_INFO_FRAGMENT } from './fragments'

export const SEND_DIRECT_MESSAGE = gql`
  mutation SendDirectMessage($input: CreateDirectMessageInput!) {
    sendDirectMessage(input: $input) {
      ...MessageInfo
    }
  }
  ${MESSAGE_INFO_FRAGMENT}
`
