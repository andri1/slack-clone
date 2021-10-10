import { gql } from '@apollo/client'
import { USER_INFO_FRAGMENT } from './fragments'

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserInfo
    }
  }
  ${USER_INFO_FRAGMENT}
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${USER_INFO_FRAGMENT}
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      ...UserInfo
    }
  }
  ${USER_INFO_FRAGMENT}
`
