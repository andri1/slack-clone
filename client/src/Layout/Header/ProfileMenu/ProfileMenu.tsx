import { MouseEvent, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useHistory } from 'react-router-dom'
import { unsetTokens } from 'utils/authentication'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { ProfileInfo } from './ProfileInfo'
import { useGetMeQuery } from 'generated/graphql'

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { data } = useGetMeQuery()
  const me = data?.me

  const client = useApolloClient()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const history = useHistory()

  const disconnect = () => {
    unsetTokens()
    client.clearStore()
    history.push('/sign-in')
  }

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        {me ? (
          <Avatar
            style={{
              height: 32,
              width: 32,
            }}
          >
            <Typography>
              {me.firstName.charAt(0).toUpperCase()}
              {me.lastName && me.lastName.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
        ) : (
          <Avatar sx={{ width: 32, height: 32 }} alt="" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
        onClose={handleClose}
        PaperProps={menuPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {me && <ProfileInfo me={me} />}

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography>My profile</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <LockRoundedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

const menuPaperProps = {
  elevation: 0,
  sx: {
    minWidth: 220,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}
