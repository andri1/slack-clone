import { FC, useCallback } from 'react'
import { Chat, PageHeader } from 'components'
import { useParams } from 'react-router-dom'
import {
  ChannelMessagesQuery,
  ChannelMessagesQueryVariables,
  useChannelMessagesQuery,
  useGetChannelQuery,
  useSendChannelMessageMutation,
} from 'generated/graphql'
import { CHANNEL_MESSAGES } from 'features/message/queries'

export const Channel: FC = () => {
  const { channelID } = useParams<{ channelID: string }>()

  const { data: channelData } = useGetChannelQuery({
    variables: { id: channelID },
  })
  const channel = channelData?.channel

  const { data: messagesData } = useChannelMessagesQuery({
    variables: { channelID },
  })
  const messages = messagesData?.channelMessages

  const [sendChannelMessageMutation] = useSendChannelMessageMutation({
    update: (cache, { data }) => {
      const createdMessage = data?.sendChannelMessage

      if (createdMessage) {
        try {
          const cacheMessagesData = cache.readQuery<
            ChannelMessagesQuery,
            ChannelMessagesQueryVariables
          >({
            query: CHANNEL_MESSAGES,
            variables: { channelID: channel?.id! },
          })
          if (cacheMessagesData?.channelMessages) {
            cache.writeQuery<
              ChannelMessagesQuery,
              ChannelMessagesQueryVariables
            >({
              query: CHANNEL_MESSAGES,
              variables: { channelID: channel?.id! },
              data: {
                channelMessages: cacheMessagesData.channelMessages.concat([
                  createdMessage,
                ]),
              },
            })
          }
        } catch {}
      }
    },
  })

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
