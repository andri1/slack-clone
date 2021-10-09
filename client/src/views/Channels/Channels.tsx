import { FC } from 'react'
import PageHeader from 'components/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useGetChannelQuery } from 'generated/graphql'

export const Channels: FC = () => {
  const { channelId } = useParams<{ channelId: string }>()

  const { data } = useGetChannelQuery({
    variables: { id: channelId },
  })

  console.log(channelId)

  return (
    <div>
      <PageHeader type="CH" title={data?.channel.name || '...'} />
    </div>
  )
}

export default Channels
