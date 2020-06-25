import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth0 } from "../react-auth0-spa";

export const ProtectedRoute = ({ component: Component, path, exact }) => {
    // const { user } = useAuth0();
    const user = JSON.parse(localStorage.getItem('type_app_userObj'));
    console.log('user in protected route: ', user);
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) =>
          user.isMatchable ? <Component {...props} /> : <Redirect to="/onboard" />
        }
      />
    );
  };
