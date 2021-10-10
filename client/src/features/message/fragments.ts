import { gql } from '@apollo/client'

export const MESSAGE_INFO_FRAGMENT = gql`
  fragment MessageInfo on Message {
    id
    author {
      firstName
      lastName
    }
    content
    createdAt
    updatedAt
  }
`
