import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Review from './review';
import Item from './item';
import Search from './search';
import Exchange from './matching';
import User from './user';
import Swipe from './swipes';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}review`} component={Review} />
      <ErrorBoundaryRoute path={`${match.url}item`} component={Item} />
      <ErrorBoundaryRoute path={`${match.url}search`} component={Search} />
      <ErrorBoundaryRoute path={`${match.url}item`} component={Item}  />
      <ErrorBoundaryRoute path={`${match.url}exchange`} component={Exchange} />
      <ErrorBoundaryRoute path={`${match.url}swipe`} component={Swipe} />
      <ErrorBoundaryRoute path={`${match.url}user`} component={User} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
