import { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import Layout from '../../../Layout'

export type RouteWithLayoutProps = RouteProps & {
  component: ComponentType<any>
}

export const RouteWithLayout = (props: RouteWithLayoutProps) => {
  const { component: Component, ...rest } = props

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
