import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { ProfileMenu } from './ProfileMenu/ProfileMenu'

export const Header: FC = () => {
  return (
    <>
      <AppBar
        enableColorOnDark
        sx={{ boxShadow: 1, backgroundColor: 'primary.dark' }}
      >
        <Toolbar variant="dense">
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ marginLeft: 'auto' }}>
              <ProfileMenu />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  )
}

export default Header
