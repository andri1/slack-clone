import React from 'react'
import MuiButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export const Button = React.forwardRef<any, any>((props, ref) => {
  const { children, loading = false, ...others } = props

  return (
    <MuiButton {...others} ref={ref} disabled={loading}>
      {children}
      {loading && (
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={24} />
        </div>
      )}
    </MuiButton>
  )
})

export default Button
