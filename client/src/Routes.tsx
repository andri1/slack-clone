import { FC } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Home, Signin, Channel, DirectMessage } from './views'

const Routes: FC = () => {
  return (
    <Switch>
      <Route component={Signin} exact path="/sign-in" />
      <RouteWithLayout component={Home} exact path="/" />
      <RouteWithLayout component={Channel} path="/channels/:channelId" />
      <RouteWithLayout
        component={DirectMessage}
        exact
        path="/direct-messages/:messageId"
      />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
