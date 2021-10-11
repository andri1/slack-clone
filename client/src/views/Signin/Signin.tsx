import { FC, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from 'components/extended/TextField'
import { useGetMeQuery, useLoginMutation } from 'generated/graphql'
import { getToken, saveToken } from 'features/authentication/utils'
import LogoSection from 'components/LogoSection'
import Copyright from 'components/Copyright'

export const Signin: FC = () => {
  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      saveToken(data.login.accessToken)
      window.location.href = '/'
    },
  })

  const [error, setError] = useState<any>(null)

  const { data: meData, loading } = useGetMeQuery()
  const me = meData?.me

  if (!!getToken() && loading) {
    return <Typography>Loading...</Typography>
  }
  if (me) {
    return <Redirect to="/" />
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const login = data.get('login') as string
    const password = data.get('password') as string

    if (login && password) {
      loginMutation({
        variables: { login, password },
      }).catch((error) => {
        const { graphQLErrors, networkError } = error
        if (graphQLErrors?.[0]?.extensions?.code) {
          switch (graphQLErrors[0].extensions?.code) {
            case 'USER_NOT_FOUND':
              setError({ login: 'Email address or username not found' })
              break

            case 'WRONG_PASSWORD':
              setError({ password: 'Wrong password' })
              break
            default:
              console.error(graphQLErrors[0].message)
              break
          }
        } else if (networkError) {
          console.error('Network error')
        } else {
          console.error('Unknown error')
        }
      })
    }
  }

  const onInputChange = () => {
    setError(null)
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
            id="login"
            label="Email Address or Username"
            name="login"
            size="small"
            error={!!error?.login}
            helperText={error?.login || ''}
            onChange={onInputChange}
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
            size="small"
            error={!!error?.password}
            helperText={error?.password || ''}
            onChange={onInputChange}
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

export default Signin
