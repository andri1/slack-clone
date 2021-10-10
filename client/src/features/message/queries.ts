import { gql } from '@apollo/client'
import { MESSAGE_INFO_FRAGMENT } from './fragments'

export const DIRECT_MESSAGES = gql`
  query DirectMessages($recipientUserID: ID!) {
    directMessages(recipientUserID: $recipientUserID) {
      ...MessageInfo
    }
  }
  ${MESSAGE_INFO_FRAGMENT}
`
