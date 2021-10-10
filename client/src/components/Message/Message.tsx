import React from 'react'
import Avatar from 'components/extended/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MessageInfoFragment } from 'generated/graphql'

type MessageProps = {
  message: MessageInfoFragment
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        p: 2,
        '&:hover': {
          backgroundColor: 'whitesmoke',
        },
      }}
    >
      <div style={{ display: 'flex' }}>
        <Box sx={{ marginRight: 1 }}>
          <Avatar user={message.author} size={40} />
        </Box>

        <div style={{ flex: 1 }}>
          <Typography component="span" style={{ fontWeight: 'bold' }}>
            {message.author.firstName} {message.author.lastName || ''}
          </Typography>
          &nbsp;
          <Typography component="span" variant="caption" color="text.secondary">
            {new Date(message.createdAt).toLocaleString()}
          </Typography>
          <br />
          <Typography>{message.content}</Typography>
        </div>
      </div>
    </Box>
  )
}

export default Message
