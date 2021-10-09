import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { User } from 'generated/graphql'

export type AvatarProps = {
  user: User
} & MuiAvatarProps

export const Avatar = (props: AvatarProps) => {
  const { user, ...rest } = props

  return (
    <MuiAvatar
      style={{
        height: 32,
        width: 32,
      }}
      {...rest}
    >
      {user && (
        <Typography>
          {user.firstName.charAt(0).toUpperCase()}
          {user.lastName && user.lastName.charAt(0).toUpperCase()}
        </Typography>
      )}
    </MuiAvatar>
  )
}

export default Avatar
