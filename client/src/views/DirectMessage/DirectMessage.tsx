import { FC, useCallback, useEffect } from 'react'
import { Chat, PageHeader } from 'components'
import { useParams } from 'react-router-dom'
import {
  DirectMessageCreatedSubscription,
  DirectMessageCreatedSubscriptionVariables,
  useDirectMessagesQuery,
  useGetUserQuery,
  useSendDirectMessageMutation,
} from 'generated/graphql'
import { DIRECT_MESSAGE_CREATED } from 'features/message/subscription'

export const DirectMessage: FC = () => {
  const { userID } = useParams<{ userID: string }>()

  const { data: userData } = useGetUserQuery({
    variables: { id: userID },
  })
  const user = userData?.user

  const { data: messagesData, subscribeToMore: subscribeToMoreDirectMessages } =
    useDirectMessagesQuery({
      variables: { recipientUserID: userID },
    })
  const messages = messagesData?.directMessages

  const [sendDirectMessageMutation] = useSendDirectMessageMutation()

  const handleSubmitMessage = useCallback(
    (content: string) => {
      if (user?.id) {
        sendDirectMessageMutation({
          variables: {
            input: {
              content,
              recipientUserID: user.id,
            },
          },
        })
      }
    },
    [sendDirectMessageMutation, user],
  )

  useEffect(() => {
    let unsuscribe: any = null

    if (userID) {
      unsuscribe = subscribeToMoreDirectMessages<
        DirectMessageCreatedSubscription,
        DirectMessageCreatedSubscriptionVariables
      >({
        document: DIRECT_MESSAGE_CREATED,
        variables: { recipientUserID: userID },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newMessage = subscriptionData.data.directMessageCreated

          return Object.assign({}, prev, {
            directMessages: [...prev.directMessages, newMessage],
          })
        },
      })
    }

    return () => {
      if (unsuscribe) unsuscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        type="DM"
        title={
          user?.firstName ||
          '' + (user?.lastName ? ` ${user?.lastName}` : '') ||
          '...'
        }
        user={user}
      />

      <div style={{ flex: 1, minHeight: 200 }}>
        <Chat messages={messages} onSubmit={handleSubmitMessage} />
      </div>
    </div>
  )
}

export default DirectMessage
