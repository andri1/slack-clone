import { FC, useCallback, useEffect } from 'react'
import { Chat, PageHeader } from 'components'
import { useParams } from 'react-router-dom'
import {
  ChannelMessageCreatedSubscription,
  ChannelMessageCreatedSubscriptionVariables,
  useChannelMessagesQuery,
  useGetChannelQuery,
  useSendChannelMessageMutation,
} from 'generated/graphql'
import { CHANNEL_MESSAGE_CREATED } from 'features/message/subscription'

export const Channel: FC = () => {
  const { channelID } = useParams<{ channelID: string }>()

  const { data: channelData } = useGetChannelQuery({
    variables: { id: channelID },
  })
  const channel = channelData?.channel

  const {
    data: messagesData,
    subscribeToMore: subscribeToMoreChannelMessages,
  } = useChannelMessagesQuery({
    variables: { channelID },
  })
  const messages = messagesData?.channelMessages

  const [sendChannelMessageMutation] = useSendChannelMessageMutation()

  const handleSubmitMessage = useCallback(
    (content: string) => {
      if (channel?.id) {
        sendChannelMessageMutation({
          variables: {
            input: {
              content,
              channelID: channel.id,
            },
          },
        })
      }
    },
    [sendChannelMessageMutation, channel],
  )

  useEffect(() => {
    subscribeToMoreChannelMessages<
      ChannelMessageCreatedSubscription,
      ChannelMessageCreatedSubscriptionVariables
    >({
      document: CHANNEL_MESSAGE_CREATED,
      variables: { channelID },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newMessage = subscriptionData.data.channelMessageCreated

        return Object.assign({}, prev, {
          channelMessages: [...prev.channelMessages, newMessage],
        })
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        type="CH"
        title={channel?.name || '...'}
        description={channel?.description || ''}
      />

      <div style={{ flex: 1 }}>
        <Chat messages={messages} onSubmit={handleSubmitMessage} />
      </div>
    </div>
  )
}

export default Channel
