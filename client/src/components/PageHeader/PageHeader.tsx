import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export type PageHeaderProps = {
  type: 'CH' | 'DM'
  title: string
  description?: string
}

export const PageHeader: FC<PageHeaderProps> = ({
  type,
  title,
  description,
}) => {
  return (
    <>
      <Box sx={{ py: '12px', px: 2 }}>
        <Typography
          variant="h6"
          color="inherit"
          component="span"
          style={{ fontWeight: 'bold' }}
        >
          {type === 'CH' ? '#' : <AccountBoxIcon />}&nbsp;{title}
        </Typography>

        {description && (
          <Typography
            style={{ marginLeft: 16 }}
            variant="body2"
            component="span"
            color="textSecondary"
          >
            {description}
          </Typography>
        )}
      </Box>
      <Divider />
    </>
  )
}

export default PageHeader
