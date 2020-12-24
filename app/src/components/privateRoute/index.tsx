import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getFromStorage } from '../../utils/localStorage';

const loginRoute = '/login';

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  redirect?: string;
}> = ({ component, path, exact, redirect = loginRoute }) => {
  const isLoggedIn = Boolean(getFromStorage('token'));

  return isLoggedIn ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={redirect} />
  );
};
export default PrivateRoute;
