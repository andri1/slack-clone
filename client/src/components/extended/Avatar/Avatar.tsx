import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { User } from 'generated/graphql'

export type AvatarProps = {
  user?: Pick<User, 'firstName' | 'lastName'>
  size?: number
} & MuiAvatarProps

export const Avatar = (props: AvatarProps) => {
  const { user, size = 32, ...rest } = props

  return (
    <MuiAvatar
      {...{
        style: {
          height: size,
          width: size,
        },
        ...rest,
      }}
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
