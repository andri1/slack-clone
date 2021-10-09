import { FC } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Home, Signin } from './views'

const Routes: FC = () => {
  return (
    <Switch>
      <Route component={Signin} exact path="/sign-in" />
      <RouteWithLayout component={Home} exact path="/" />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
