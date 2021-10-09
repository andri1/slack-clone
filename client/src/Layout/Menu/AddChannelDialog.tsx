import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import TextField from 'components/extended/TextField'
import Button from 'components/extended/Button'
import { GetChannelsQuery, useCreateChannelMutation } from 'generated/graphql'
import { GET_CHANNELS } from 'features/channel/queries'

export type AddChannelDialogProps = {
  onClose: () => void
} & Omit<DialogProps, 'onClose'>

export const AddChannelDialog: React.FC<AddChannelDialogProps> = (props) => {
  const { onClose, open, ...other } = props

  const [createChannelMutation, { loading }] = useCreateChannelMutation({
    update: (cache, { data }) => {
      const createdChannel = data?.createChannel

      if (createdChannel) {
        try {
          const channelsData = cache.readQuery<GetChannelsQuery>({
            query: GET_CHANNELS,
          })
          if (channelsData?.channels) {
            cache.writeQuery<GetChannelsQuery>({
              query: GET_CHANNELS,
              data: {
                channels: channelsData.channels.concat([createdChannel]),
              },
            })
          }
        } catch {}
      }
    },
    onCompleted: onClose,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const name = data.get('name') as string
    const description = data.get('description') as string

    if (name) {
      createChannelMutation({
        variables: { input: { name, description } },
      })
    }
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { position: 'relative' } }}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      {...other}
    >
      <form onSubmit={handleSubmit}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle> Create a channel </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </DialogContentText>

          <TextField
            required
            label="Name"
            fullWidth
            margin="normal"
            size="small"
            name="name"
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            size="small"
            name="description"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" loading={loading}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddChannelDialog
