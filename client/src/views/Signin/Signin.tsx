import { FC } from 'react'
import { useHistory } from 'react-router'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from 'components/extended/TextField'
import { useLoginMutation } from 'generated/graphql'
import { saveToken } from 'features/authentication/utils'
import LogoSection from 'Layout/Menu/LogoSection'

export const Signin: FC = () => {
  const history = useHistory()

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      saveToken(data.login.accessToken)
      history.push('/')
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const login = data.get('login') as string
    const password = data.get('password') as string

    if (login && password) {
      loginMutation({
        variables: { login, password },
      }).catch(() => {
        // TODO handle wrong login errors
      })
    }
  }

  return (
    <Container
      maxWidth="sm"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <LogoSection />
        </Box>

        <Typography variant="h4" color="primary" style={{ fontWeight: 'bold' }}>
          Sign in to your workspace
        </Typography>

        <Container
          maxWidth="xs"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or Username"
            name="login"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Copyright sx={{ mt: 'auto', mb: 4 }} />
    </Container>
  )
}

const Copyright: FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Slack Clone
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Signin
