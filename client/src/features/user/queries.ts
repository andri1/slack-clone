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
