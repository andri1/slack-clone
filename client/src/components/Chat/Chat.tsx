import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import Message from 'components/Message'
import { MessageInfoFragment } from 'generated/graphql'

export type ChatProps = {
  messages?: MessageInfoFragment[]
  onSubmit?: (content: string) => void
}

export const Chat: FC<ChatProps> = (props) => {
  const { onSubmit, messages } = props

  const messagesWrapRef = useRef<HTMLDivElement>(null)

  const [inputValue, setInputValue] = useState<string>('')

  const handleMessageSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)

      const content = data.get('content') as string

      if (onSubmit) {
        onSubmit(content)
      }
      setInputValue('')
    },
    [onSubmit],
  )

  const handleInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => {
    setInputValue(event.target.value)
  }, [])

  useEffect(() => {
    if (messagesWrapRef.current) {
      messagesWrapRef.current.scrollTop = messagesWrapRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Box
      sx={{
        height: '100%',
        maxHeight: '100%',
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        ref={messagesWrapRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages?.map((message, i) => (
          <Message
            key={message.id}
            message={message}
            style={{ marginTop: i === 0 ? 'auto' : 'unset' }}
          />
        ))}
      </div>

      <Paper
        component="form"
        variant="outlined"
        onSubmit={handleMessageSubmit}
        sx={{
          mx: 2,
          mt: 2,
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
          value={inputValue}
          onChange={handleInputChange}
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
  )
}

export default Chat
