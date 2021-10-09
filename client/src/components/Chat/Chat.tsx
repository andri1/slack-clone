import { FC, FormEventHandler, useCallback } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

export type ChatProps = {
  messages: any[]
  onSubmit?: (content: string) => void
}

export const Chat: FC<ChatProps> = (props) => {
  const { onSubmit } = props

  const handleMessageSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)

      const content = data.get('content') as string

      console.log(content)

      if (onSubmit) {
        onSubmit(content)
      }
    },
    [onSubmit],
  )

  return (
    <>
      <Box
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <Paper
          component="form"
          variant="outlined"
          onSubmit={handleMessageSubmit}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 1,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write your message here..."
            inputProps={{ 'aria-label': 'send message' }}
            name="content"
          />
          <IconButton
            type="submit"
            color="primary"
            sx={{ p: '10px' }}
            aria-label="send"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </>
  )
}

export default Chat
