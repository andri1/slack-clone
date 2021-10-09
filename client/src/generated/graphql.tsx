import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Channel = {
  __typename?: 'Channel'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
}

export type CreateChannelInput = {
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type CreateUserInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName?: Maybe<Scalars['String']>
  password: Scalars['String']
  username: Scalars['String']
}

export type LoginPayload = {
  __typename?: 'LoginPayload'
  accessToken: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createChannel: Channel
  createUser: User
  deleteChannel: Channel
  deleteUser: User
  login: LoginPayload
  signup: LoginPayload
  updateChannel: Channel
  updateUser: User
}

export type MutationCreateChannelArgs = {
  input: CreateChannelInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteChannelArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationLoginArgs = {
  login: Scalars['String']
  password: Scalars['String']
}

export type MutationSignupArgs = {
  input: CreateUserInput
}

export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type Query = {
  __typename?: 'Query'
  channel: Channel
  channels?: Maybe<Array<Channel>>
  me: User
  user: User
  users?: Maybe<Array<User>>
}

export type QueryChannelArgs = {
  id: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type UpdateChannelInput = {
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['ID']
  lastName?: Maybe<Scalars['String']>
  password: Scalars['String']
  username: Scalars['String']
}

export type LoginMutationVariables = Exact<{
  login: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'LoginPayload'; accessToken: string }
}

export type ChannelInfoFragment = {
  __typename?: 'Channel'
  id: string
  name: string
  description?: string | null | undefined
}

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput
}>

export type CreateChannelMutation = {
  __typename?: 'Mutation'
  createChannel: {
    __typename?: 'Channel'
    id: string
    name: string
    description?: string | null | undefined
  }
}

export type GetChannelQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetChannelQuery = {
  __typename?: 'Query'
  channel: {
    __typename?: 'Channel'
    id: string
    name: string
    description?: string | null | undefined
  }
}

export type GetChannelsQueryVariables = Exact<{ [key: string]: never }>

export type GetChannelsQuery = {
  __typename?: 'Query'
  channels?:
    | Array<{
        __typename?: 'Channel'
        id: string
        name: string
        description?: string | null | undefined
      }>
    | null
    | undefined
}

export type UserInfoFragment = {
  __typename?: 'User'
  id: string
  username: string
  email: string
  firstName: string
  lastName?: string | null | undefined
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
  __typename?: 'Query'
  me: {
    __typename?: 'User'
    id: string
    username: string
    email: string
    firstName: string
    lastName?: string | null | undefined
  }
}

export const ChannelInfoFragmentDoc = gql`
  fragment ChannelInfo on Channel {
    id
    name
    description
  }
`
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    email
    firstName
    lastName
  }
`
export const LoginDocument = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      accessToken
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const CreateChannelDocument = gql`
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
      ...ChannelInfo
    }
  }
  ${ChannelInfoFragmentDoc}
`
export type CreateChannelMutationFn = Apollo.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, options)
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>
export type CreateChannelMutationResult =
  Apollo.MutationResult<CreateChannelMutation>
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>
export const GetChannelDocument = gql`
  query GetChannel($id: ID!) {
    channel(id: $id) {
      ...ChannelInfo
    }
  }
  ${ChannelInfoFragmentDoc}
`

/**
 * __useGetChannelQuery__
 *
 * To run a query within a React component, call `useGetChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChannelQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChannelQuery,
    GetChannelQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChannelQuery, GetChannelQueryVariables>(
    GetChannelDocument,
    options,
  )
}
export function useGetChannelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChannelQuery,
    GetChannelQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChannelQuery, GetChannelQueryVariables>(
    GetChannelDocument,
    options,
  )
}
export type GetChannelQueryHookResult = ReturnType<typeof useGetChannelQuery>
export type GetChannelLazyQueryHookResult = ReturnType<
  typeof useGetChannelLazyQuery
>
export type GetChannelQueryResult = Apollo.QueryResult<
  GetChannelQuery,
  GetChannelQueryVariables
>
export const GetChannelsDocument = gql`
  query GetChannels {
    channels {
      ...ChannelInfo
    }
  }
  ${ChannelInfoFragmentDoc}
`

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetChannelsQuery,
    GetChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(
    GetChannelsDocument,
    options,
  )
}
export function useGetChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChannelsQuery,
    GetChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(
    GetChannelsDocument,
    options,
  )
}
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>
export type GetChannelsLazyQueryHookResult = ReturnType<
  typeof useGetChannelsLazyQuery
>
export type GetChannelsQueryResult = Apollo.QueryResult<
  GetChannelsQuery,
  GetChannelsQueryVariables
>
export const GetMeDocument = gql`
  query GetMe {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  )
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
