import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import {
  useGetChannelsQuery,
  useGetMeQuery,
  useGetUsersQuery,
} from 'generated/graphql'

export const Home = () => {
  const { data } = useGetMeQuery()
  const me = data?.me

  const { data: channelsData, loading: loadingChannels } = useGetChannelsQuery()
  const { data: usersData, loading: loadingUsers } = useGetUsersQuery()

  const isChannels = channelsData?.channels?.length
  const isTeammates = usersData?.users?.length && usersData.users.length > 1

  return (
    <Box sx={{ p: 2 }}>
      {loadingChannels || loadingUsers ? (
        <CircularProgress />
      ) : (
        <>
          <Typography
            component="p"
            variant="h5"
            style={{ fontWeight: 500 }}
            gutterBottom
          >
            Welcome {me?.firstName}!
          </Typography>

          <Typography gutterBottom>
            Here you can create channels where you can discuss about specific
            topics with your teammates, or have private chat with them.
          </Typography>

          {!isChannels && (
            <Typography gutterBottom>
              You can start by creating a channel by clicking on the "Add
              channel" button in the sidebar.
            </Typography>
          )}
          {!isTeammates && (
            <Typography gutterBottom>
              Looks like you don't have any teammates yet
              {!isChannels ? ' too' : ''}, invite them to{' '}
              <Typography component="a" href="/signup" color="primary">
                create an account
              </Typography>
              , then you'll see them appear under the 'Direct Messages' section.
            </Typography>
          )}
        </>
      )}

      {isChannels && isTeammates ? (
        <Typography gutterBottom>
          Hope you like the platform, enjoy it! :)
        </Typography>
      ) : null}
    </Box>
  )
}
