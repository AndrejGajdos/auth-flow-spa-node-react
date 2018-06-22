import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-tippy/dist/tippy.css';

import App from 'components/App';
import reducers from 'state/index';
import sagas from 'sagas/index';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
