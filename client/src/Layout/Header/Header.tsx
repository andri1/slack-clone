import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { ProfileMenu } from './ProfileMenu/ProfileMenu'

export const Header: FC = () => {
  return (
    <>
      <AppBar sx={{ boxShadow: 1 }} enableColorOnDark>
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
