import { FC, useCallback } from 'react'
import { Chat, PageHeader } from 'components'
import { useParams } from 'react-router-dom'
import {
  DirectMessagesQuery,
  DirectMessagesQueryVariables,
  useDirectMessagesQuery,
  useGetUserQuery,
  useSendDirectMessageMutation,
} from 'generated/graphql'
import { DIRECT_MESSAGES } from 'features/message/queries'

export const DirectMessage: FC = () => {
  const { messageId } = useParams<{ messageId: string }>()

  const { data: userData } = useGetUserQuery({
    variables: { id: messageId },
  })
  const user = userData?.user

  const { data: messagesData } = useDirectMessagesQuery({
    variables: { recipientUserID: user?.id || '' },
  })
  const messages = messagesData?.directMessages

  const [sendDirectMessageMutation] = useSendDirectMessageMutation({
    update: (cache, { data }) => {
      const createdMessage = data?.sendDirectMessage

      if (createdMessage) {
        try {
          const cacheMessagesData = cache.readQuery<
            DirectMessagesQuery,
            DirectMessagesQueryVariables
          >({
            query: DIRECT_MESSAGES,
            variables: { recipientUserID: user?.id! },
          })
          if (cacheMessagesData?.directMessages) {
            cache.writeQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(
              {
                query: DIRECT_MESSAGES,
                variables: { recipientUserID: user?.id! },
                data: {
                  directMessages: cacheMessagesData.directMessages.concat([
                    createdMessage,
                  ]),
                },
              },
            )
          }
        } catch {}
      }
    },
  })

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

      <div style={{ flex: 1 }}>
        <Chat messages={messages} onSubmit={handleSubmitMessage} />
      </div>
    </div>
  )
}

export default DirectMessage
