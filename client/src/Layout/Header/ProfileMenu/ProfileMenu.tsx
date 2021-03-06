import { MouseEvent, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import { ProfileInfo } from './ProfileInfo'
import { useGetMeQuery } from 'generated/graphql'
import { unsetTokens } from 'features/authentication/utils'

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { data } = useGetMeQuery()
  const me = data?.me

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const disconnect = () => {
    unsetTokens()
    window.location.href = '/sign-in'
  }

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <Avatar
          style={{
            height: 32,
            width: 32,
          }}
        >
          {me && (
            <Typography>
              {me.firstName.charAt(0).toUpperCase()}
              {me.lastName && me.lastName.charAt(0).toUpperCase()}
            </Typography>
          )}
        </Avatar>
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

        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
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
