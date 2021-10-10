import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from 'components/extended/Avatar'
import { UserInfoFragment } from 'generated/graphql'

export type PageHeaderProps = {
  type: 'CH' | 'DM'
  title: string
  description?: string
  user?: UserInfoFragment
}

export const PageHeader: FC<PageHeaderProps> = ({
  type,
  title,
  description,
  user,
}) => {
  return (
    <>
      <Box
        sx={{
          py: '12px',
          px: 2,
          display: 'flex',
          alignItems: type === 'CH' ? 'baseline' : 'center',
        }}
      >
        {type === 'DM' && <Avatar user={user} />}
        <Typography
          variant="h6"
          color="inherit"
          component="p"
          style={{ fontWeight: 'bold' }}
        >
          {type === 'CH' ? '#' : ''}&nbsp;{title}
        </Typography>

        {description && (
          <Typography
            style={{ marginLeft: 16 }}
            variant="body2"
            component="span"
            color="textSecondary"
          >
            {description}
          </Typography>
        )}
      </Box>
      <Divider />
    </>
  )
}

export default PageHeader
