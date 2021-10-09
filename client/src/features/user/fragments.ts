import { gql } from '@apollo/client'

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    username
    email
    firstName
    lastName
  }
`
