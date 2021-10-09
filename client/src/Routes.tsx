import { FC } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Home, Signin, Channels } from './views'

const Routes: FC = () => {
  return (
    <Switch>
      <Route component={Signin} exact path="/sign-in" />
      <RouteWithLayout component={Home} exact path="/" />
      <RouteWithLayout component={Channels} path="/channels/:channelId" />
      <RouteWithLayout component={Home} exact path="/direct-messages" />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
