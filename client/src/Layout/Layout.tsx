import { FC } from 'react'

export const Layout: FC = (props) => {
  const { children } = props

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      Header
      <div style={{ flex: 1, display: 'flex' }}>
        {/*  
           Menu 
        */}
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
