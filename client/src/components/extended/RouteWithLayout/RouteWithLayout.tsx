import { getToken, unsetTokens } from 'features/authentication/utils'
import { useGetMeQuery } from 'generated/graphql'
import { ComponentType } from 'react'
import Typography from '@mui/material/Typography'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import Layout from '../../../Layout'

export type RouteWithLayoutProps = RouteProps & {
  component: ComponentType<any>
}

export const RouteWithLayout = (props: RouteWithLayoutProps) => {
  const { component: Component, ...rest } = props

  const { data, loading } = useGetMeQuery()
  const me = data?.me

  if (!getToken()) {
    return <Redirect to="/sign-in" />
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (!me) {
    unsetTokens()
    return <Redirect to="/sign-in" />
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export default RouteWithLayout
