import React from 'react'
import MuiTextField from '@mui/material/TextField'

export const TextField = React.forwardRef<any, any>((props, ref) => {
  const { children, ...others } = props

  return (
    <MuiTextField
      {...{
        ...others,
        inputRef: ref,
        variant: 'outlined',
        InputLabelProps: { shrink: true },
        sx: {
          '& .MuiInputLabel-root': (theme) => ({
            transform: 'none',
            position: 'static',
            marginBottom: '4px',
            ...theme.typography.body1,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }),

          '& fieldset': {
            top: 0,
            '& legend': {
              display: 'none',
            },
          },
        },
      }}
    />
  )
})

export default TextField
