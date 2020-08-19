/* eslint-disable react/prop-types */
/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import { selectIsAuthenticated } from './features/auth/authSlice';

const LazyChatPage = React.lazy(() =>
  import(/* webpackChunkName: "ChatPage" */ './containers/ChatPage')
);

const ChatPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyChatPage {...props} />
  </React.Suspense>
);

function PrivateRoute({ children, ...rest }: Record<string, any>) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.HOME,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function LoginRoute({ children, ...rest }: Record<string, any>) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.CHAT,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <App>
      <Switch>
        <PrivateRoute path={routes.CHAT}>
          <ChatPage />
        </PrivateRoute>
        <LoginRoute path={routes.HOME}>
          <HomePage />
        </LoginRoute>
      </Switch>
    </App>
  );
}
