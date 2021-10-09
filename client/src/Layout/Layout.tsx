import { FC } from 'react'
import Divider from '@mui/material/Divider'
import Header from './Header/Header'
import Menu from './Menu/Menu'

export const Layout: FC = (props) => {
  const { children } = props

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <div style={{ flex: 1, display: 'flex' }}>
        <Menu />
        <Divider orientation="vertical" flexItem />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  )
}

export default Layout
