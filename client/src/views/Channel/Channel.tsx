import { FC } from 'react'
import { Chat, PageHeader } from 'components'
import { useParams } from 'react-router-dom'
import { useGetChannelQuery } from 'generated/graphql'

export const Channel: FC = () => {
  const { channelId } = useParams<{ channelId: string }>()

  const { data } = useGetChannelQuery({
    variables: { id: channelId },
  })

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        type="CH"
        title={data?.channel.name || '...'}
        description={data?.channel.description || ''}
      />

      <div style={{ flex: 1 }}>
        <Chat messages={[]} />
      </div>
    </div>
  )
}

export default Channel
