import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { GetMeQuery } from 'generated/graphql'

export type ProfileInfoProps = {
  me: GetMeQuery['me']
}

export const ProfileInfo = ({ me }: ProfileInfoProps) => {
  return (
    <MenuItem
      style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Avatar style={{ width: 48, height: 48 }}>
        <Typography>
          {me.firstName.charAt(0).toUpperCase()}
          {me.lastName && me.lastName.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Typography fontSize="16px" lineHeight="24px" paddingTop={1}>
        {me.firstName} {me.lastName}
      </Typography>

      <Typography
        fontSize="14px"
        lineHeight="20.02px"
        style={{ color: 'rgba(0, 0, 0, 0.38)' }}
      >
        {me.email}
      </Typography>
    </MenuItem>
  )
}
