import { FC } from 'react'
import { Switch } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Home } from './views'

const Routes: FC = () => {
  return (
    <Switch>
      <RouteWithLayout component={Home} exact path="/" />
    </Switch>
  )
}

export default Routes
