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
  Date: any
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

export type CreateChannelMessageInput = {
  channelID: Scalars['ID']
  content?: Maybe<Scalars['String']>
}

export type CreateDirectMessageInput = {
  content?: Maybe<Scalars['String']>
  recipientUserID: Scalars['ID']
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

export type Message = {
  __typename?: 'Message'
  author: User
  /** recipient if recipientType === CHANNEL */
  channel?: Maybe<Channel>
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  id: Scalars['ID']
  recipientType: RecipientType
  /** recipient if recipientType === USER */
  recipientUser?: Maybe<User>
  updatedAt: Scalars['Date']
}

export type Mutation = {
  __typename?: 'Mutation'
  createChannel: Channel
  createUser: User
  deleteChannel: Channel
  deleteUser: User
  login: LoginPayload
  sendChannelMessage: Message
  sendDirectMessage: Message
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

export type MutationSendChannelMessageArgs = {
  input: CreateChannelMessageInput
}

export type MutationSendDirectMessageArgs = {
  input: CreateDirectMessageInput
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
  channelMessages: Array<Message>
  channels?: Maybe<Array<Channel>>
  directMessages: Array<Message>
  me?: Maybe<User>
  user: User
  users?: Maybe<Array<User>>
}

export type QueryChannelArgs = {
  id: Scalars['ID']
}

export type QueryChannelMessagesArgs = {
  channelID: Scalars['ID']
}

export type QueryDirectMessagesArgs = {
  recipientUserID: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export enum RecipientType {
  Channel = 'CHANNEL',
  User = 'USER',
}

export type Subscription = {
  __typename?: 'Subscription'
  channelMessageCreated: Message
  directMessageCreated: Message
}

export type SubscriptionChannelMessageCreatedArgs = {
  channelID: Scalars['ID']
}

export type SubscriptionDirectMessageCreatedArgs = {
  recipientUserID: Scalars['ID']
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

export type SignupMutationVariables = Exact<{
  input: CreateUserInput
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup: { __typename?: 'LoginPayload'; accessToken: string }
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

export type MessageInfoFragment = {
  __typename?: 'Message'
  id: string
  content?: string | null | undefined
  createdAt: any
  updatedAt: any
  author: {
    __typename?: 'User'
    firstName: string
    lastName?: string | null | undefined
  }
}

export type SendDirectMessageMutationVariables = Exact<{
  input: CreateDirectMessageInput
}>

export type SendDirectMessageMutation = {
  __typename?: 'Mutation'
  sendDirectMessage: {
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }
}

export type SendChannelMessageMutationVariables = Exact<{
  input: CreateChannelMessageInput
}>

export type SendChannelMessageMutation = {
  __typename?: 'Mutation'
  sendChannelMessage: {
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }
}

export type DirectMessagesQueryVariables = Exact<{
  recipientUserID: Scalars['ID']
}>

export type DirectMessagesQuery = {
  __typename?: 'Query'
  directMessages: Array<{
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }>
}

export type ChannelMessagesQueryVariables = Exact<{
  channelID: Scalars['ID']
}>

export type ChannelMessagesQuery = {
  __typename?: 'Query'
  channelMessages: Array<{
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }>
}

export type DirectMessageCreatedSubscriptionVariables = Exact<{
  recipientUserID: Scalars['ID']
}>

export type DirectMessageCreatedSubscription = {
  __typename?: 'Subscription'
  directMessageCreated: {
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }
}

export type ChannelMessageCreatedSubscriptionVariables = Exact<{
  channelID: Scalars['ID']
}>

export type ChannelMessageCreatedSubscription = {
  __typename?: 'Subscription'
  channelMessageCreated: {
    __typename?: 'Message'
    id: string
    content?: string | null | undefined
    createdAt: any
    updatedAt: any
    author: {
      __typename?: 'User'
      firstName: string
      lastName?: string | null | undefined
    }
  }
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
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        email: string
        firstName: string
        lastName?: string | null | undefined
      }
    | null
    | undefined
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    username: string
    email: string
    firstName: string
    lastName?: string | null | undefined
  }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  users?:
    | Array<{
        __typename?: 'User'
        id: string
        username: string
        email: string
        firstName: string
        lastName?: string | null | undefined
      }>
    | null
    | undefined
}

export const ChannelInfoFragmentDoc = gql`
  fragment ChannelInfo on Channel {
    id
    name
    description
  }
`
export const MessageInfoFragmentDoc = gql`
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
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    email
    firstName
    lastName
  }
`
export const SignupDocument = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      accessToken
    }
  }
`
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options,
  )
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>
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
export const SendDirectMessageDocument = gql`
  mutation SendDirectMessage($input: CreateDirectMessageInput!) {
    sendDirectMessage(input: $input) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`
export type SendDirectMessageMutationFn = Apollo.MutationFunction<
  SendDirectMessageMutation,
  SendDirectMessageMutationVariables
>

/**
 * __useSendDirectMessageMutation__
 *
 * To run a mutation, you first call `useSendDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDirectMessageMutation, { data, loading, error }] = useSendDirectMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendDirectMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendDirectMessageMutation,
    SendDirectMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SendDirectMessageMutation,
    SendDirectMessageMutationVariables
  >(SendDirectMessageDocument, options)
}
export type SendDirectMessageMutationHookResult = ReturnType<
  typeof useSendDirectMessageMutation
>
export type SendDirectMessageMutationResult =
  Apollo.MutationResult<SendDirectMessageMutation>
export type SendDirectMessageMutationOptions = Apollo.BaseMutationOptions<
  SendDirectMessageMutation,
  SendDirectMessageMutationVariables
>
export const SendChannelMessageDocument = gql`
  mutation SendChannelMessage($input: CreateChannelMessageInput!) {
    sendChannelMessage(input: $input) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`
export type SendChannelMessageMutationFn = Apollo.MutationFunction<
  SendChannelMessageMutation,
  SendChannelMessageMutationVariables
>

/**
 * __useSendChannelMessageMutation__
 *
 * To run a mutation, you first call `useSendChannelMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendChannelMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendChannelMessageMutation, { data, loading, error }] = useSendChannelMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendChannelMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendChannelMessageMutation,
    SendChannelMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SendChannelMessageMutation,
    SendChannelMessageMutationVariables
  >(SendChannelMessageDocument, options)
}
export type SendChannelMessageMutationHookResult = ReturnType<
  typeof useSendChannelMessageMutation
>
export type SendChannelMessageMutationResult =
  Apollo.MutationResult<SendChannelMessageMutation>
export type SendChannelMessageMutationOptions = Apollo.BaseMutationOptions<
  SendChannelMessageMutation,
  SendChannelMessageMutationVariables
>
export const DirectMessagesDocument = gql`
  query DirectMessages($recipientUserID: ID!) {
    directMessages(recipientUserID: $recipientUserID) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`

/**
 * __useDirectMessagesQuery__
 *
 * To run a query within a React component, call `useDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectMessagesQuery({
 *   variables: {
 *      recipientUserID: // value for 'recipientUserID'
 *   },
 * });
 */
export function useDirectMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    DirectMessagesQuery,
    DirectMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(
    DirectMessagesDocument,
    options,
  )
}
export function useDirectMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DirectMessagesQuery,
    DirectMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(
    DirectMessagesDocument,
    options,
  )
}
export type DirectMessagesQueryHookResult = ReturnType<
  typeof useDirectMessagesQuery
>
export type DirectMessagesLazyQueryHookResult = ReturnType<
  typeof useDirectMessagesLazyQuery
>
export type DirectMessagesQueryResult = Apollo.QueryResult<
  DirectMessagesQuery,
  DirectMessagesQueryVariables
>
export const ChannelMessagesDocument = gql`
  query ChannelMessages($channelID: ID!) {
    channelMessages(channelID: $channelID) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`

/**
 * __useChannelMessagesQuery__
 *
 * To run a query within a React component, call `useChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessagesQuery({
 *   variables: {
 *      channelID: // value for 'channelID'
 *   },
 * });
 */
export function useChannelMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ChannelMessagesQuery,
    ChannelMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(
    ChannelMessagesDocument,
    options,
  )
}
export function useChannelMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChannelMessagesQuery,
    ChannelMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ChannelMessagesQuery,
    ChannelMessagesQueryVariables
  >(ChannelMessagesDocument, options)
}
export type ChannelMessagesQueryHookResult = ReturnType<
  typeof useChannelMessagesQuery
>
export type ChannelMessagesLazyQueryHookResult = ReturnType<
  typeof useChannelMessagesLazyQuery
>
export type ChannelMessagesQueryResult = Apollo.QueryResult<
  ChannelMessagesQuery,
  ChannelMessagesQueryVariables
>
export const DirectMessageCreatedDocument = gql`
  subscription DirectMessageCreated($recipientUserID: ID!) {
    directMessageCreated(recipientUserID: $recipientUserID) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`

/**
 * __useDirectMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useDirectMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDirectMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectMessageCreatedSubscription({
 *   variables: {
 *      recipientUserID: // value for 'recipientUserID'
 *   },
 * });
 */
export function useDirectMessageCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    DirectMessageCreatedSubscription,
    DirectMessageCreatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    DirectMessageCreatedSubscription,
    DirectMessageCreatedSubscriptionVariables
  >(DirectMessageCreatedDocument, options)
}
export type DirectMessageCreatedSubscriptionHookResult = ReturnType<
  typeof useDirectMessageCreatedSubscription
>
export type DirectMessageCreatedSubscriptionResult =
  Apollo.SubscriptionResult<DirectMessageCreatedSubscription>
export const ChannelMessageCreatedDocument = gql`
  subscription ChannelMessageCreated($channelID: ID!) {
    channelMessageCreated(channelID: $channelID) {
      ...MessageInfo
    }
  }
  ${MessageInfoFragmentDoc}
`

/**
 * __useChannelMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useChannelMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessageCreatedSubscription({
 *   variables: {
 *      channelID: // value for 'channelID'
 *   },
 * });
 */
export function useChannelMessageCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    ChannelMessageCreatedSubscription,
    ChannelMessageCreatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    ChannelMessageCreatedSubscription,
    ChannelMessageCreatedSubscriptionVariables
  >(ChannelMessageCreatedDocument, options)
}
export type ChannelMessageCreatedSubscriptionHookResult = ReturnType<
  typeof useChannelMessageCreatedSubscription
>
export type ChannelMessageCreatedSubscriptionResult =
  Apollo.SubscriptionResult<ChannelMessageCreatedSubscription>
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
export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
