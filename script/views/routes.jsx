import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Redirect } from 'react-router';
import { AsyncHomeView, AsyncAboutView } from 'asyncViews';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={AsyncHomeView} />
      <Route path="/about" component={AsyncAboutView} />

      <Route
        path="/facebook/success/"
        render={() => (
          <Redirect
            to={{
              pathname: Cookies.get('lastLocation_before_logging'),
              state: { loadUser: true },
            }}
          />
        )}
      />
    </Switch>
  );
}
