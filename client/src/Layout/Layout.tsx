import { FC } from 'react'
import Divider from '@mui/material/Divider'
import Header from './Header/Header'
import Menu from './Menu/Menu'

export const Layout: FC = (props) => {
  const { children } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div
        style={{
          flex: 1,
          display: 'flex',
          minHeight: 200,
          overflowY: 'hidden',
        }}
      >
        <Menu />
        <Divider orientation="vertical" flexItem />
        <main style={{ flex: 1, maxHeight: '100%' }}>{children}</main>
      </div>
    </div>
  )
}

export default Layout
