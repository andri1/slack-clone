import { FC } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Home, Signin, Signup, Channel, DirectMessage } from './views'

const Routes: FC = () => {
  return (
    <Switch>
      <Route component={Signin} exact path="/sign-in" />
      <Route component={Signup} exact path="/signup" />
      <RouteWithLayout component={Home} exact path="/" />
      <RouteWithLayout component={Channel} path="/channels/:channelID" />
      <RouteWithLayout
        component={DirectMessage}
        exact
        path="/direct-messages/:userID"
      />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
