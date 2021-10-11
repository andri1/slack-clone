import { FC, useState } from 'react'
import { Redirect } from 'react-router'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from 'components/extended/TextField'
import { useGetMeQuery, useSignupMutation } from 'generated/graphql'
import { getToken, saveToken } from 'features/authentication/utils'
import LogoSection from 'components/LogoSection'
import Copyright from 'components/Copyright'

export const Signup: FC = () => {
  const [signupMutation] = useSignupMutation({
    onCompleted: (data) => {
      saveToken(data.signup.accessToken)
      window.location.href = '/'
    },
  })

  const { data: meData, loading } = useGetMeQuery()
  const me = meData?.me

  const [error, setError] = useState<any>(null)

  if (!!getToken() && loading) {
    return <Typography>Loading...</Typography>
  }
  if (me) {
    return <Redirect to="/" />
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const username = data.get('username') as string
    const email = data.get('email') as string
    const firstName = data.get('firstName') as string
    const lastName = data.get('lastName') as string
    const password = data.get('password') as string

    const input = {
      username,
      email,
      firstName,
      lastName,
      password,
    }

    if (username && email && firstName && password) {
      signupMutation({
        variables: { input },
      }).catch((error) => {
        const { graphQLErrors, networkError } = error
        if (graphQLErrors?.[0]?.extensions?.code) {
          switch (graphQLErrors[0].extensions.code) {
            case 'ALREADY_USED_USERNAME':
              setError({ username: 'This username is already used' })
              break

            case 'ALREADY_USED_EMAIL':
              setError({ email: 'This email is already used' })
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
          Create an account
        </Typography>

        <Container
          maxWidth="xs"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!error?.login}
            helperText={error?.login || ''}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            size="small"
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            size="small"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            size="small"
            onChange={onInputChange}
            error={!!error?.username}
            helperText={error?.username || ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            size="small"
            onChange={onInputChange}
            error={!!error?.email}
            helperText={error?.email || ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Copyright sx={{ mt: 'auto', mb: 4 }} />
    </Container>
  )
}

export default Signup
